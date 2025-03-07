import type { InternalApi } from "nitropack";
import { z } from "zod";

export type ApiRoutes = keyof InternalApi;

export type ApiResponse<
  T extends ApiRoutes,
  M extends keyof InternalApi[T],
> = InternalApi[T][M];

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
  wsInstance.onopen = () => (status.value = "connected");
  wsInstance.onclose = () => (status.value = "disconnected");
  wsInstance.onerror = () => (status.value = "closed");
  wsInstance.onmessage = (ev) => {
    const result = schema.safeParse(JSON.parse(ev.data));
    if (!result.success) {
      console.error(result.error);
      return;
    }
    const { type, data } = result.data;
    data.value = { ...data.value, [type]: data };
  };
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
