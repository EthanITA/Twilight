import { z } from "zod";

const TOPIC = {
  HINT: "hint",
  MESSAGE: "message",
} as const;

const hintSchema = z.object({ topic: z.literal(TOPIC.HINT), data: z.string() });
const messageSchema = z.object({
  topic: z.literal(TOPIC.MESSAGE),
  data: z.object({ title: z.string(), content: z.string().default("") }),
});
const schema = {
  hint: hintSchema,
  message: messageSchema,
  either: z.union([hintSchema, messageSchema]),
};

export const NOTE = {
  TOPIC,
  schema,
};
