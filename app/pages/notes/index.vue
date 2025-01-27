<template>
  <Editor
    v-if="note"
    v-model:content="note.content"
    v-model:title="note.title"
    class="pb-40 overflow-y-auto"
  />
</template>

<script lang="ts" setup>
const note = ref();

const {status} = useApi(()=>api.note.get(1).then((res) => {
  note.value = res;
  console.log(res);
}));
</script>
