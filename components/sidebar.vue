<script lang="ts" setup>
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useSidebar } from "~/store/sidebar";

const sidebar = useSidebar();
</script>

<template>
  <aside
    class="sticky top-0 overflow-y-auto space-y-4 w-72 py-4 px-4 bg-base-100"
  >
    <!-- Logo -->
    <div class="flex gap-2 items-center pointer-events-none">
      <img alt="Logo" class="size-8" src="@/assets/images/twilight-icon.svg" />
      <h3 class="font-bold text-xl">Twilight</h3>
    </div>
    <div class="divider" />
    <!-- Links -->
    <div>
      <h2 class="font-bold">Apps</h2>

      <ul class="menu">
        <li v-for="app in sidebar.apps">
          <NuxtLink :to="app.link" activeClass="active">
            <component :is="app.icon" class="size-5" />
            <span>{{ app.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="divider"></div>

    <!-- Bottom menu -->
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
  </aside>
</template>

<style scoped></style>
