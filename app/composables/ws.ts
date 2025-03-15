import note from "./ws/note";

export const $ws = <A extends ApiRoutes>(url: A) => new WebSocket(url);

type WsMessage = { topic: string; data: Record<string, unknown> | string };

export const useDefineWs = (ws: () => WebSocket) => ws();
export const useWs = (websocket: () => WebSocket) => {
  const ws = websocket();
  type WsType = WsMessage["topic"];
  type WsData = WsMessage["data"];

  const status = ref<"pending" | "connected" | "disconnected" | "closed">(
    "pending",
  );
  const data = ref<Record<WsType, WsMessage> | {}>({});

  const parseMessage = (ev: MessageEvent) => JSON.parse(ev.data) as WsMessage;

  const waitMessage = <T extends WsData>(
    topic: WsType,
    { signal }: { signal?: AbortSignal } = {},
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      const listener = (ev: MessageEvent) => {
        if (signal) {
          signal.removeEventListener("abort", onAbort);
        }
        const message = parseMessage(ev);
        if (message.topic === topic) {
          ws.removeEventListener("message", listener);
          resolve(message.data as T);
        }
      };

      const onAbort = () => {
        ws.removeEventListener("message", listener);
        reject(new Error("Promise aborted"));
      };

      ws.addEventListener("message", listener);
      if (signal) {
        signal.addEventListener("abort", onAbort, { once: true });
      }
    });
  };

  ws.addEventListener("open", () => (status.value = "connected"));
  ws.addEventListener("close", () => (status.value = "disconnected"));
  ws.addEventListener("error", () => (status.value = "closed"));
  ws.addEventListener("message", (ev) => {
    const message = parseMessage(ev);
    data.value = { ...data.value, [message.topic]: message };
  });
  return {
    status: computed(() => status.value),
    isConnected: computed(() => status.value === "connected"),
    isDisconnected: computed(() => status.value === "disconnected"),
    isClosed: computed(() => status.value === "closed"),
    isPending: computed(() => status.value === "pending"),
    data,
    send: (data: Record<any, any>) => ws.send(JSON.stringify(data)),
    waitMessage,
  };
};

export default { note };
