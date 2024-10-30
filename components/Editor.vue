<template>
  <h1 class="text-2xl">hello</h1>
  <editor-content :editor="editor" class="bg-gray-200" />
</template>

<script lang="ts" setup>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";

const modelValue = defineModel<string>({
  default: "<ul><li><p>asdasd</p></li></ul>",
});
const editor = new Editor({
  extensions: [StarterKit],
  content: modelValue.value,
  onUpdate: () => {
    modelValue.value = editor.getHTML();
  },
});

watch(modelValue, (value) => {
  if (editor.getHTML() === value) return;
  editor.commands.setContent(value, false);
});

onMounted(editor.commands.focus);
onUnmounted(editor.destroy);
</script>
