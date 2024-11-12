<script lang="ts" setup>
const sidebar = useSidebar();
</script>

<template>
  <aside
    class="sticky top-0 overflow-y-auto space-y-4 w-72 py-4 px-4 bg-base-100"
  >
    <!-- Logo -->
    <div class="flex gap-2 items-center pointer-events-none select-none">
      <img
        alt="Logo"
        class="size-8"
        src="../../assets/images/twilight-icon.svg"
      />
      <h3 class="font-bold text-xl">Twilight</h3>
    </div>
    <!-- Links -->
    <ul class="menu p-0">
      <li v-for="app in sidebar.apps">
        <NuxtLink
          :class="{ active: sidebar.currentApp?.name === app.name }"
          :to="app.link"
        >
          <component :is="app.icon" class="size-5" />
          <span>{{ app.name }}</span>
        </NuxtLink>
      </li>
    </ul>
    <template v-if="sidebar.currentApp">
      <div class="divider" />
      <component :is="sidebar.currentApp.app" />
    </template>
  </aside>
</template>

<style scoped></style>
