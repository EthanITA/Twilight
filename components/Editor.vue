<template>
  <div class="editor bg-gray-200 flex flex-col overflow-y-auto">
    <AtomsContent
      ref="contentRef"
      v-model="title"
      class="tiptap-title"
      placeholder="Title"
      tag="h1"
      @keydown.enter.prevent="editor.commands.focus()"
    />
    <editor-content :editor="editor" class="flex-1" />
  </div>
</template>

<script lang="ts" setup>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import { Placeholder } from "@tiptap/extension-placeholder";
import { DragHandle } from "@tiptap-pro/extension-drag-handle";

const title = defineModel<string>("title", { default: "" });
const content = defineModel<string>("content", { default: "" });

const editor = ref();
const contentRef = ref<HTMLElement | null>(null);

watch(content, (value) => {
  if (editor.value.getHTML() === value) return;
  editor.value.commands.setContent(value, false);
});
watch(title, () => {
  // prevent new lines
  title.value = title.value.replace(/&nbsp;/g, "").replace(/[\n\r]/g, " ");
});

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Mathematics,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      DragHandle.configure({
        render() {
          const element = document.createElement("div");
          element.classList.add("custom-drag-handle");
          return element;
        },
      }),
    ],
    content: content.value,
    onUpdate: () => {
      content.value = editor.value.getHTML();
    },
  });
});
onUnmounted(() => editor.value.destroy());
</script>

<style scoped></style>
