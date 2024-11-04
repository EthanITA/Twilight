<script lang="ts" setup>
import { BubbleMenu, type Editor } from "@tiptap/vue-3";
import { buttons } from "~/const/editor/menu";

defineProps<{
  editor: Editor;
}>();
</script>

<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
  >
    <div class="bubble-menu">
      <button
        v-for="button in buttons"
        :key="button.label"
        :data-active="button.isActive && editor.isActive(button.isActive)"
        @click="button.command(editor.chain().focus()).run()"
      >
        {{ button.label }}
      </button>
    </div>
  </bubble-menu>
</template>

<style scoped></style>
