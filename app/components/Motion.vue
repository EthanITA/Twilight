<script lang="ts" setup>
import { Motion } from "motion-v";
</script>

<template>
  <Motion v-bind="$attrs">
    <slot />
  </Motion>
</template>

<style scoped></style>
