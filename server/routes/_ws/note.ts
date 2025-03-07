import { Peer } from "crossws";
import { debounce } from "es-toolkit";
import { Note } from "~~/server/database/schema";
import { z } from "zod";

type Handlers = Record<
  (typeof NOTE.TOPIC)[keyof typeof NOTE.TOPIC],
  (peer: Peer, data?: any) => any
>;

const saveMessage = debounce((note: Pick<Note, "content" | "title">) => {
  return dbMethods
    .useNote()
    .save(1, note)
    .then(
      () => true,
      () => false,
    );
}, 10000);

const handlers: Handlers = {
  [NOTE.TOPIC.HINT]: async (peer, data: string) => {
    const hint = await useAI().complete(data.slice(-2048));
    peer.send({ topic: NOTE.TOPIC.HINT, data: hint });
  },
  [NOTE.TOPIC.MESSAGE]: async (
    peer,
    data: z.infer<typeof NOTE.schema.message>["data"],
  ) => {
    saveMessage(data);
    peer.send({ topic: NOTE.TOPIC.MESSAGE, data: "OK" });
  },
};

export default defineWebSocketHandler({
  async open(peer) {
    const note = await dbMethods.useNote().get(1);
    peer.send({ topic: NOTE.TOPIC.MESSAGE, data: note });
    console.log(`${peer.id} connected!`);
  },
  message(peer, message) {
    const { topic, data } = NOTE.schema.either.parse(message.json());
    console.log(`${peer.id} sent ${topic}!`);
    handlers[topic](peer, NOTE.schema[topic].parse({ topic, data }));
  },
  close(peer) {
    peer.publish("chat", { user: "server", message: `${peer} left!` });
    console.log(`${peer.id} disconnected!`);
    saveMessage.flush();
  },
});
