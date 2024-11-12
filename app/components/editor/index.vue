<script lang="ts" setup>
import { Editor, EditorContent } from "@tiptap/vue-3";
import tiptapEditor from "~/const/editor";

const title = defineModel<string>("title", { default: "" });
const content = defineModel<string>("content", { default: "" });

const editor = ref<Editor>(tiptapEditor());
editor.value.on("update", () => (content.value = editor.value!.getHTML()));

watch(
  content,
  (val) => {
    if (editor.value!.getHTML() === val) return;
    editor.value!.commands.setContent(val, false);
  },
  { immediate: true },
);
watch(
  title,
  () =>
    // prevent new lines
    (title.value = title.value.replace(/&nbsp;/g, "").replace(/[\n\r]/g, " ")),
  { immediate: true },
);

onUnmounted(() => {
  console.log("destroying editor");
  editor.value!.destroy();
});
</script>

<template>
  <div class="size-full flex flex-col overflow-y-auto">
    <atoms-content
      v-model="title"
      class="tiptap-title"
      placeholder="Title"
      tag="h1"
      @keydown.enter.prevent="editor.commands.focus()"
    />
    <editor-content :editor="editor" class="flex-1" />
    <editor-menu :editor="editor" />
  </div>
</template>

<style scoped></style>
