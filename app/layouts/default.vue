<script lang="ts" setup></script>

<template>
  <div class="flex flex-col size-full overflow-hidden">
    <div class="flex grow">
      <Sidebar />
      <div class="flex-1">
        <slot />
      </div>
    </div>
    <Status />
  </div>
</template>

<style scoped></style>
