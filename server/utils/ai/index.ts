import * as agent from "./agent";
import { Signal } from "./agent";

export const useAI = (signal?: Signal) => ({
  complete: agent.complete(signal),
});
