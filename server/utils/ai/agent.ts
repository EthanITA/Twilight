import {openai} from "~~/server/utils/ai/provider";
import prompts from "~~/server/utils/ai/prompts";

/**
 * Completes the "content", it will return a response
 * @param content
 */
export const complete = async (content: string) => {
  const response = await openai({
    max_tokens: 16,
    model: "gpt-4o-mini",
    temperature: 0.3,
  }).invoke([
    { type: "system", content: prompts.AUTOCOMPLETE },
    { type: "user", content },
  ]);
  return response.content as string;
};
