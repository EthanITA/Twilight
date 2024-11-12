<script lang="ts" setup>
import { PlusIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between items-center">
      <h2 class="font-bold">Notes</h2>
      <button
        class="btn btn-primary btn-neutral btn-square btn-xs text-lg"
        title="Add project"
      >
        <PlusIcon class="size-5" />
      </button>
    </div>

    <ul class="menu px-0">
      <li>
        <NuxtLink>
          <i class="fa-solid fa-circle text-primary"></i>
          UI components
          <i class="fa-solid fa-chevron-right self-end"></i>
        </NuxtLink>
      </li>
      <li>
        <a>
          <i class="fa-solid fa-circle text-secondary"></i>
          Blog navigation
          <i class="fa-solid fa-chevron-right self-end"></i>
        </a>
      </li>
      <li>
        <a>
          <i class="fa-solid fa-circle text-accent"></i>
          Design system
          <i class="fa-solid fa-chevron-right self-end"></i>
        </a>
      </li>
      <li>
        <a>
          <i class="fa-solid fa-circle text-neutral"></i>
          Wishlist components
          <i class="fa-solid fa-chevron-right self-end"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
