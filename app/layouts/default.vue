<script lang="ts" setup></script>

<template>
  <div class="flex flex-col size-full overflow-hidden">
    <div class="flex grow overflow-hidden">
      <Sidebar />
      <div class="flex-1 overflow-x-hidden">
        <slot />
      </div>
    </div>
    <Status />
  </div>
</template>

<style scoped></style>
