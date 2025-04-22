<script lang="ts" setup>
import { Check, LoaderCircle } from "lucide-vue-next";

const status = useStatus();
</script>

<template>
  <UTooltip :delay-duration="0">
    <template #content>
      <span v-if="status.bgLoading"> Saving... </span>
      <span v-else> Everything saved! </span>
    </template>
    <template #default>
      <span>
        <LoaderCircle v-if="status.bgLoading" class="size-full animate-spin" />
        <Check v-else class="size-full" />
      </span>
    </template>
  </UTooltip>
</template>

<style scoped></style>
