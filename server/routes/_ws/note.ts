import { Peer } from "crossws";
import { debounce } from "es-toolkit";
import { Note } from "~~/server/database/schema";
import { z } from "zod";

const cacheHint = new Map<string, string>();
interface NoteContext {
  controllers: { [key: string]: AbortController };
  createController: (k: string) => AbortController;
  getController: (k: string) => AbortController | undefined;
  saveNote: ((note: Pick<Note, "content" | "title">) => Promise<any>) & {
    flush: () => void;
  };
  [key: string]: any;
}

interface PeerNote extends Peer {
  context: NoteContext;
}

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return hash >>> 0; // Ensure the hash is a positive integer
}

type Handlers = Record<
  (typeof NOTE.TOPIC)[keyof typeof NOTE.TOPIC],
  (peer: PeerNote, data?: any) => any
>;

const handlers: Handlers = {
  [NOTE.TOPIC.HINT]: async (peer, data: string) => {
    if (cacheHint.has(data)) {
      return peer.send({ topic: NOTE.TOPIC.HINT, data: cacheHint.get(data) });
    }
    const controller = peer.context.createController(data);
    const hint = await useAI(controller.signal).complete(data);
    cacheHint.set(data, hint);
    if (controller.signal.aborted) return;
    peer.send({ topic: NOTE.TOPIC.HINT, data: hint });
  },
  [NOTE.TOPIC.ABORT_HINT]: async (peer, data: string) => {
    peer.context.getController(data)?.abort();
  },
  [NOTE.TOPIC.MESSAGE]: async (
    peer,
    data: z.infer<typeof NOTE.schema.message>["data"],
  ) => {
    peer.context.saveNote(data);
    peer.send({ topic: NOTE.TOPIC.MESSAGE, data: "OK" });
  },
};

const saveNote = (note: z.infer<typeof NOTE.schema.message>["data"]) => {
  return dbMethods.useNote().save(note.id, {
    title: note.title,
    content: note.content,
  });
};
export default defineWebSocketHandler({
  async open(peer) {
    peer.context[peer.id] = { user: "server" };
    peer.context.saveNote = saveNote;
    peer.context.controllers = {};
    peer.context.createController = (k: string) => {
      k = hashString(k).toString(16);
      return ((peer as PeerNote).context.controllers[k] =
        new AbortController());
    };
    peer.context.getController = (k: string) => {
      k = hashString(k).toString(16);
      return (peer as PeerNote).context.controllers[k];
    };
    console.log(`${peer.id} connected!`);
  },
  message(peer, message) {
    const { topic, data } = NOTE.schema.either.parse(message.json());
    console.log(`${peer.id} sent ${topic}!`);
    handlers[topic](peer as PeerNote, data);
  },
  close(peer) {
    peer.publish("chat", { user: "server", message: `${peer} left!` });
    console.log(`${peer.id} disconnected!`);
    (peer as PeerNote).context.saveNote.flush();
  },
});
