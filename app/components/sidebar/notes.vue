<script lang="ts" setup>
import { Plus } from "lucide-vue-next";

const noteStore = useNote();
const notes = computed(() => noteStore.noteApi);
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between items-center">
      <h2 class="font-bold">Notes</h2>
      <button class="btn btn-primary btn-square btn-xs" title="Add project">
        <Plus class="size-5" />
      </button>
    </div>

    <ul class="menu px-0 w-full">
      <li :key="note.id" v-for="note in notes.data ?? []">
        <NuxtLink :to="`/notes/${note.id}`">
          {{ note.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
