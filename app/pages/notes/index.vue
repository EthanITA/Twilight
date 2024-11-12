<template>
  <Editor
    v-model:content="note.current.content"
    v-model:title="note.current.title"
  />
</template>

<script lang="ts" setup>
const note = useNote();
note.get(1);

/*const id = 1;
const savePoll = setInterval(async () => {
  await note.save(1);
}, 5000);

onUnmounted(async () => {
  await note.save(1);
  clearInterval(savePoll);
});*/
</script>
