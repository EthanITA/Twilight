import { EventHandlerRequest, H3Event } from "h3";

const isProduction = () => {
  try {
    return useEnv().NODE_ENV === "production";
  } catch (e: any) {
    return true;
  }
};

export default defineEventHandler(async (event) => {
  if (!isProduction()) return;
  const is = (path: string) => event.path.startsWith(path);
  const handlers: [
    string,
    (event: H3Event<EventHandlerRequest>) => Promise<void>,
  ][] = [
    ["/api/auth", async () => {}],
    [
      "/api",
      async () => {
        const token = event.headers
          .get("cookie")
          ?.split(";")
          .map((c) => c.trim())
          .find((c) => c.startsWith("better-auth.session_token"))
          ?.split("=")[1];

        if (!token) {
          throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
          });
        }
      },
    ],
  ];
  for (const [path, handler] of handlers) {
    if (is(path)) {
      await handler(event);
      break;
    }
  }
});
