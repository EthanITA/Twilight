<template>
  <Editor
    v-if="note"
    v-model:content="note.content"
    v-model:title="note.title"
    class="pb-40 overflow-y-auto"
  />
</template>

<script lang="ts" setup>
import {debounce} from "es-toolkit";

const note = ref();

const {isSuccess} = useApi(() => api.note.get(1).then((res) => {
  note.value = res;
  console.log(res);
}));

const {isPending} = useAction(debounce(() => api.note.save(1, note.value), 1000), {
  deps: note,
  deep: true,
})

</script>
