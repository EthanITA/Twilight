import { Editor, Extension, type RawCommands } from "@tiptap/vue-3";
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
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

// InlineHint extension to display a ghosted hint after the cursor.
const pluginKey = new PluginKey("inlineHint");

const InlineHint = Extension.create({
  name: "inlineHint",

  addCommands() {
    return {
      setHint:
        (hint: string) =>
        ({ tr, dispatch }: any) => {
          tr.setMeta(pluginKey, { hint });
          if (dispatch) {
            dispatch(tr);
          }
          return true;
        },
      clearHint:
        () =>
        ({ tr, dispatch }: any) => {
          tr.setMeta(pluginKey, { hint: null });
          if (dispatch) {
            dispatch(tr);
          }
          return true;
        },
    } as Partial<RawCommands>;
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: pluginKey,
        state: {
          init() {
            return { hint: null, decorations: DecorationSet.empty };
          },
          apply(tr, pluginState, oldState, newState) {
            const meta = tr.getMeta(pluginKey);
            let { hint } = pluginState;
            if (meta !== undefined) {
              hint = meta.hint;
            }
            let decorations = DecorationSet.empty;
            if (hint) {
              // Always use the current cursor position from newState.selection.from
              const pos = newState.selection.from;
              const deco = Decoration.widget(
                pos,
                () => {
                  const span = document.createElement("span");
                  span.textContent = hint;
                  span.className = "inline-hint text-gray-400";
                  return span;
                },
                { side: 1 },
              );
              decorations = DecorationSet.create(newState.doc, [deco]);
            }
            return { hint, decorations };
          },
        },
        props: {
          decorations(state) {
            return pluginKey.getState(state).decorations;
          },
        },
      }),
    ];
  },
});
export default () =>
  new Editor({
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
      TextAlign,
      Highlight,
      Superscript,
      Subscript,
      Underline,
      DetailsSummary,
      DetailsContent,
      TaskList,
      TaskItem,
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
          const drag = document.createElement("div");
          drag.classList.add("custom-drag-handle");
          element.append(drag);
          const addLine = document.createElement("div");
          addLine.classList.add("custom-drag-handle");
          element.append(addLine);
          element.classList.add("flex", "gap-1");
          return element;
        },
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(all),
      }),
      Details.configure({
        persist: true,
        HTMLAttributes: {
          class: "details",
        },
      }),
      InlineHint,
    ],
  });
