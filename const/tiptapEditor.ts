import { Editor } from "@tiptap/vue-3";
import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Code } from "@tiptap/extension-code";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { Document } from "@tiptap/extension-document";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Heading } from "@tiptap/extension-heading";
import { History } from "@tiptap/extension-history";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Italic } from "@tiptap/extension-italic";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { Text } from "@tiptap/extension-text";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import { Placeholder } from "@tiptap/extension-placeholder";
import { DragHandle } from "@tiptap-pro/extension-drag-handle";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { Underline } from "@tiptap/extension-underline";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Details } from "@tiptap-pro/extension-details";
import { DetailsSummary } from "@tiptap-pro/extension-details-summary";
import { DetailsContent } from "@tiptap-pro/extension-details-content";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { all, createLowlight } from "lowlight";

export default new Editor({
  extensions: [
    Blockquote,
    Bold,
    BulletList,
    Code,
    Dropcursor,
    Document,
    Gapcursor,
    HardBreak,
    Heading,
    History,
    HorizontalRule,
    Italic,
    ListItem,
    OrderedList,
    Paragraph,
    Strike,
    Text,
    Mathematics,
    Placeholder.configure({
      includeChildren: true,
      placeholder: ({ node }) => {
        if (node.type.name === "paragraph") {
          return "Type something...";
        } else if (node.type.name === "detailsSummary") {
          return "Summary";
        }
        return "";
      },
    }),
    DragHandle.configure({
      render: () => {
        const element = document.createElement("div");
        element.classList.add("custom-drag-handle");
        return element;
      },
    }),
    TextAlign,
    Highlight,
    Superscript,
    Subscript,
    Underline,
    CodeBlockLowlight.configure({
      lowlight: createLowlight(all),
    }),
    Details.configure({
      persist: true,
      HTMLAttributes: {
        class: "details",
      },
    }),
    DetailsSummary,
    DetailsContent,
    TaskList,
    TaskItem,
  ],
});
