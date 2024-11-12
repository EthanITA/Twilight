import type { ChainedCommands } from "@tiptap/vue-3";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@heroicons/vue/24/solid";

interface Button {
  label: string;
  command: (chain: ChainedCommands) => {
    run: () => void;
  };
  isActive?: string;
  icon?: Component;
}

export const buttons: (Button | null)[] = [
  {
    label: "Clear",
    command: (chain) => chain.unsetAllMarks(),
  },
  null,
  {
    label: "Bold",
    command: (chain) => chain.toggleBold(),
    isActive: "bold",
    icon: BoldIcon,
  },
  {
    label: "Italic",
    command: (chain) => chain.toggleItalic(),
    isActive: "italic",
    icon: ItalicIcon,
  },
  {
    label: "Strike",
    command: (chain) => chain.toggleStrike(),
    isActive: "strike",
    icon: StrikethroughIcon,
  },
  {
    label: "Underline",
    command: (chain) => chain.toggleUnderline(),
    isActive: "underline",
    icon: UnderlineIcon,
  },
];
