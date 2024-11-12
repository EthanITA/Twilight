<template>
  {{ state }}
  {{ status }}
  {{ data }}
  <Editor
    v-model:content="note.current.content"
    v-model:title="note.current.title"
    class="pb-40 overflow-y-auto"
  />
</template>

<script lang="ts" setup>
const note = useNote();
const api = useApi();
const { state, status, data } = useQuery({
  key: ["notes"],
  query: () => api.note.getAll(),
});
</script>
