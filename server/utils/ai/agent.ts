import { openai } from "~~/server/utils/ai/provider";
import prompts from "~~/server/utils/ai/prompts";

export type Signal = AbortController["signal"];

export const defineAiHandler = <I extends unknown, O extends unknown>(
  fn: (signal?: Signal) => (input: I) => Promise<O>,
) => fn;

export const complete = defineAiHandler((signal) => {
  return async (content: string, lastChars = 2048) => {
    const response = await openai({
      max_tokens: 16,
      model: "gpt-4o-mini",
      temperature: 0.3,
    }).invoke(
      [
        { type: "system", content: prompts.AUTOCOMPLETE },
        { type: "user", content: content.slice(-lastChars) },
      ],
      { signal },
    );
    return response.content as string;
  };
});
