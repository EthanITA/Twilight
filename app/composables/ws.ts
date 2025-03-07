import { z } from "zod";

export const $ws = <A extends ApiRoutes>(url: A) => new WebSocket(url);
export const useWs = <
  T extends {
    type: string;
    data: Record<any, any>;
  },
>(
  ws: () => WebSocket,
  schema: z.ZodObject<{ type: z.ZodString; data: z.ZodRecord<z.ZodAny> }>,
) => {
  const wsInstance = ws();
  const status = ref<"pending" | "connected" | "disconnected" | "closed">(
    "pending",
  );
  const data = ref<Record<T["type"], T>>();
  wsInstance.addEventListener("open", () => (status.value = "connected"));
  wsInstance.addEventListener("close", () => (status.value = "disconnected"));
  wsInstance.addEventListener("error", () => (status.value = "closed"));
  wsInstance.addEventListener("message", (ev) => {
    const result = schema.safeParse(JSON.parse(ev.data));
    if (!result.success) {
      console.error(result.error);
      return;
    }
    const { type, data } = result.data;
    data.value = { ...data.value, [type]: data };
  });
  return {
    status: computed(() => status.value),
    isConnected: computed(() => status.value === "connected"),
    isDisconnected: computed(() => status.value === "disconnected"),
    isClosed: computed(() => status.value === "closed"),
    isPending: computed(() => status.value === "pending"),
    data,
    send: (data: Record<any, any>) => wsInstance.send(JSON.stringify(data)),
  };
};
