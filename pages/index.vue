<template>
  <Editor
    v-model:content="note.data.content"
    v-model:title="note.data.title"
    class="size-full"
  />
</template>

<script lang="ts" setup>
import { useNote } from "~/store/note";

const note = useNote();
</script>
