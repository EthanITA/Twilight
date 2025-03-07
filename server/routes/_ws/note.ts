import { Peer } from "crossws";
import { debounce } from "es-toolkit";
import { Note } from "~~/server/database/schema";
import { z } from "zod";

type Handlers = Record<
  (typeof NOTE.TOPIC)[keyof typeof NOTE.TOPIC],
  (peer: Peer, data?: any) => any
>;

const handlers: Handlers = {
  [NOTE.TOPIC.HINT]: async (peer, data: string) => {
    const hint = await useAI().complete(
      data.slice(-2048),
      (peer.context.controller as AbortController).signal,
    );
    peer.send({ topic: NOTE.TOPIC.HINT, data: hint });
  },
  [NOTE.TOPIC.ABORT_HINT]: async (peer) => {
    (peer.context.controller as AbortController).abort();
  },
  [NOTE.TOPIC.MESSAGE]: async (
    peer,
    data: z.infer<typeof NOTE.schema.message>["data"],
  ) => {
    // @ts-ignore
    peer.context.saveMessage(data);
    peer.send({ topic: NOTE.TOPIC.MESSAGE, data: "OK" });
  },
};

export default defineWebSocketHandler({
  async open(peer) {
    peer.context[peer.id] = { user: "server" };
    peer.context.saveMessage = debounce(
      (note: Pick<Note, "content" | "title">) => {
        return dbMethods.useNote().save(1, note);
      },
      10000,
    );
    peer.context.controller = new AbortController();
    console.log(`${peer.id} connected!`);
  },
  message(peer, message) {
    const { topic, data } = NOTE.schema.either.parse(message.json());
    console.log(`${peer.id} sent ${topic}!`);
    handlers[topic](peer, data);
  },
  close(peer) {
    peer.publish("chat", { user: "server", message: `${peer} left!` });
    console.log(`${peer.id} disconnected!`);
    // @ts-ignore
    peer.context.saveMessage.flush();
  },
});
