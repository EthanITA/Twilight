<template>
  <div class="size-full bg-gray-200 flex flex-col overflow-y-auto">
    <atoms-content
      ref="contentRef"
      v-model="title"
      class="tiptap-title"
      placeholder="Title"
      tag="h1"
      @keydown.enter.prevent="editor.commands.focus()"
    />
    <editor-content :editor="editor" class="flex-1" />
    <bubble-menu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
    >
      <div class="bubble-menu">
        <button
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        >
          Bold
        </button>
        <button
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          Italic
        </button>
        <button
          :class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          Strike
        </button>
      </div>
    </bubble-menu>
  </div>
</template>

<script lang="ts" setup>
import { BubbleMenu, Editor, EditorContent } from "@tiptap/vue-3";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import { Placeholder } from "@tiptap/extension-placeholder";
import { DragHandle } from "@tiptap-pro/extension-drag-handle";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { Underline } from "@tiptap/extension-underline";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import { DetailsContent } from "@tiptap-pro/extension-details-content";
import { Details } from "@tiptap-pro/extension-details";
import { DetailsSummary } from "@tiptap-pro/extension-details-summary";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Code } from "@tiptap/extension-code";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Heading } from "@tiptap/extension-heading";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Italic } from "@tiptap/extension-italic";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { Text } from "@tiptap/extension-text";
import { Document } from "@tiptap/extension-document";
import { History } from "@tiptap/extension-history";

const title = defineModel<string>("title", { default: "" });
const content = defineModel<string>("content", { default: "" });

const editor = ref<Editor>();
const contentRef = ref<HTMLElement | null>(null);

watch(content, (value) => {
  if (editor.value!.getHTML() === value) return;
  editor.value!.commands.setContent(value, false);
});
watch(title, () => {
  // prevent new lines
  title.value = title.value.replace(/&nbsp;/g, "").replace(/[\n\r]/g, " ");
});
const lowlight = createLowlight(all);

onMounted(() => {
  editor.value = new Editor({
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
        lowlight,
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
    content: content.value,
    onUpdate: () => {
      content.value = editor.value!.getHTML();
    },
  });
});
onUnmounted(() => editor.value!.destroy());
</script>

<style scoped></style>
