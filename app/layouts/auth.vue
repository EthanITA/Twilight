<script lang="ts" setup>
import AuroraBg from "~/components/inspira/aurora-bg.vue";
</script>

<template>
  <div class="grid md:grid-cols-2 size-full">
    <AuroraBg>
      <Motion
        :in-view="{ opacity: 1, filter: 'blur(0px)' }"
        :initial="{ opacity: 0, filter: 'blur(10px)' }"
        :transition="{ delay: 0.8, duration: 1, ease: 'easeInOut' }"
        as="div"
        class="relative flex flex-col items-center justify-center px-4"
      >
        <div class="text-center font-bold text-5xl">Let's redefine time.</div>
        <div class="py-4 font-extralight text-2xl text-center">
          Let your day being proactively managed and your actions
          anticipated–freeing you to focus on what matters.
        </div>
      </Motion>
    </AuroraBg>
    <slot />
  </div>
</template>

<style scoped></style>
