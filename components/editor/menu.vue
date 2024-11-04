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
      <template v-for="(button, i) in buttons" :key="button?.label ?? i">
        <button
          v-if="button"
          :data-active="button.isActive && editor.isActive(button.isActive)"
          @click="button.command(editor.chain().focus()).run()"
        >
          <component :is="button.icon" v-if="button.icon" class="size-5" />
          <span v-else class="text-sm">
            {{ button.label }}
          </span>
        </button>
        <hr v-else class="-mx-1 divider divider-horizontal" />
      </template>
    </div>
  </bubble-menu>
</template>

<style scoped></style>
