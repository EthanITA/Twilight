<template>
  {{ state }}
  {{ data }}
  <Editor
    v-model:content="note.current.content"
    v-model:title="note.current.title"
    class="pb-40 overflow-y-auto"
  />
</template>

<script lang="ts" setup>
const note = useNote();

const { state, data, execute } = useApi().note.get(1);
</script>
