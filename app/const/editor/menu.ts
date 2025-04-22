import type {ChainedCommands} from "@tiptap/vue-3";

import {Bold, Italic, Strikethrough, Underline} from "lucide-vue-next";

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
    icon: Bold,
  },
  {
    label: "Italic",
    command: (chain) => chain.toggleItalic(),
    isActive: "italic",
    icon: Italic,
  },
  {
    label: "Strike",
    command: (chain) => chain.toggleStrike(),
    isActive: "strike",
    icon: Strikethrough,
  },
  {
    label: "Underline",
    command: (chain) => chain.toggleUnderline(),
    isActive: "underline",
    icon: Underline,
  },
];
