import { openai } from "~~/server/utils/ai/provider";
import prompts from "~~/server/utils/ai/prompts";

/**
 * Completes the "content", it will return a response
 * @param content
 * @param signal for aborting the request
 */
export const complete = async (
  content: string,
  signal?: AbortController["signal"],
) => {
  const response = await openai({
    max_tokens: 16,
    model: "gpt-4o-mini",
    temperature: 0.3,
  }).invoke(
    [
      { type: "system", content: prompts.AUTOCOMPLETE },
      { type: "user", content },
    ],
    { signal },
  );
  return response.content as string;
};
