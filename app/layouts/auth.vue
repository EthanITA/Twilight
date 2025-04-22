<script lang="ts" setup>
import AuroraBg from "~/components/inspira/aurora-bg.vue";
</script>

<template>
  <AuroraBg class="size-full border-l">
    <div class="grid md:grid-cols-2 size-full">
      <div class="relative flex flex-col items-center justify-center px-4">
        <Text class="text-center font-bold text-5xl" type="title">
          Make time for what matters.
        </Text>
        <div class="py-4 font-extralight text-2xl text-center">
          Twilight’s AI plans, adapts, and prioritizes your day—giving you back
          the hours to create, build, and live.
        </div>
      </div>
      <div class="flex flex-col items-center justify-center px-4 py-8">
        <AuthLogin />
      </div>
    </div>
  </AuroraBg>
  <slot />
</template>
