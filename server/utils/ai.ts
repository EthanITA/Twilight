import * as agent from "./ai/agent";
import { Signal } from "./ai/agent";

export const useAI = (signal?: Signal) => ({
  complete: agent.complete(signal),
});
