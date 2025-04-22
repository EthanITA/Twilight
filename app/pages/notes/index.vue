<template>
  <div class="size-full flex flex-col">
    <h2 class="text-lg font-semibold">Create a new note</h2>
    <div class="flex-1 flex items-center justify-center">
      <button @click="createNote" class="mb-40 btn btn-primary btn-outline">
        Create new note
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const createNote = async () => {
  const note = await api.note.create();
  useNote().noteApi.refresh();
  navigateTo(`/notes/${note.id}`, {
    replace: true,
  });
};
</script>
