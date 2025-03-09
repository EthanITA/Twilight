import note from "./ws/note";

export const $ws = <A extends ApiRoutes>(url: A) => new WebSocket(url);

type WsMessage = { type: string; data: Record<string, unknown> };

export const useDefineWs = (ws: () => WebSocket) => ws();
export const useWs = (websocket: () => WebSocket) => {
  const ws = websocket();
  type WsType = WsMessage["type"];
  type WsData = WsMessage["data"];

  const status = ref<"pending" | "connected" | "disconnected" | "closed">(
    "pending",
  );
  const data = ref<Record<WsType, WsData> | {}>({});

  ws.addEventListener("open", () => (status.value = "connected"));
  ws.addEventListener("close", () => (status.value = "disconnected"));
  ws.addEventListener("error", () => (status.value = "closed"));
  ws.addEventListener("message", (ev) => {
    const result = JSON.parse(ev.data) as WsMessage;
    const { type, data } = result;
    data.value = { ...(data.value as Object), [type]: data };
  });
  return {
    status: computed(() => status.value),
    isConnected: computed(() => status.value === "connected"),
    isDisconnected: computed(() => status.value === "disconnected"),
    isClosed: computed(() => status.value === "closed"),
    isPending: computed(() => status.value === "pending"),
    data,
    send: (data: Record<any, any>) => ws.send(JSON.stringify(data)),
  };
};

export default { note };
