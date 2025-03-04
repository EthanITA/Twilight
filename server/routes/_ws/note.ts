import { Peer } from "crossws";
import { debounce } from "es-toolkit";

type Handlers = Record<
  (typeof NOTE.TOPIC)[keyof typeof NOTE.TOPIC],
  (peer: Peer, data?: any) => any
>;

const handlers: Handlers = {
  [NOTE.TOPIC.HINT]: async (peer, data: string) => {
    const hint = await useAI().complete(data.slice(-2048));
    peer.send({ topic: NOTE.TOPIC.HINT, data: hint });
  },
  [NOTE.TOPIC.MESSAGE]: async (peer) => {
    const note = await dbMethods.useNote().get(1);
    peer.send({ topic: NOTE.TOPIC.MESSAGE, data: note });
  },
};

const saveMessage = debounce(async () => {
  const note = await dbMethods.useNote().get(1);
  await dbMethods.useNote().save({
    id: 1,
  });
}, 5000);

export default defineWebSocketHandler({
  async open(peer) {
    handlers[NOTE.TOPIC.MESSAGE](peer);
  },
  message(peer, message) {
    const { topic, data } = NOTE.schema.either.parse(message.json());
    handlers[topic](peer, data);
  },
  close(peer) {
    peer.publish("chat", { user: "server", message: `${peer} left!` });
  },
});
