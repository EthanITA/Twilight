import { z } from "zod";

const TOPIC = {
  HINT: "hint",
  ABORT_HINT: "abort_hint",
  MESSAGE: "message",
} as const;

const hintSchema = z.object({ topic: z.literal(TOPIC.HINT), data: z.string() });
const abortHintSchema = z.object({
  topic: z.literal(TOPIC.ABORT_HINT),
  data: z.string(),
});
const messageSchema = z.object({
  topic: z.literal(TOPIC.MESSAGE),
  data: z.object({
    id: z.number(),
    title: z.string(),
    content: z.string().default(""),
  }),
});
const schema = {
  hint: hintSchema,
  message: messageSchema,
  abort_hint: abortHintSchema,
  either: z.union([hintSchema, messageSchema, abortHintSchema]),
};

export const NOTE = {
  TOPIC,
  schema,
};
