import type { ChainedCommands } from "@tiptap/vue-3";

interface Button {
  label: string;
  command: (chain: ChainedCommands) => {
    run: () => void;
  };
  isActive?: string;
}

export const buttons: Button[] = [
  {
    label: "Clear",
    command: (chain) => chain.unsetAllMarks(),
  },
  {
    label: "Bold",
    command: (chain) => chain.toggleBold(),
    isActive: "bold",
  },
  {
    label: "Italic",
    command: (chain) => chain.toggleItalic(),
    isActive: "italic",
  },
  {
    label: "Strike",
    command: (chain) => chain.toggleStrike(),
    isActive: "strike",
  },
];
