<template>
  <div
    class="relative flex flex-col items-center justify-center bg-primary-50/20 transition-bg"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        :class="{
          '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]':
            radialGradient,
        }"
        class="filter blur-[10px] invert pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform aurora-bg aurora-background-gradient-after aurora-gradient-animation"
      />
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface AuroraBackgroundProps {
  radialGradient?: boolean;
}

withDefaults(defineProps<AuroraBackgroundProps>(), { radialGradient: true });
</script>

<style scoped>
/* New class that consolidates the background and custom properties */
.aurora-bg {
  --aurora: repeating-linear-gradient(
    100deg,
    var(--color-primary-100) 10%,
    var(--color-primary-200) 15%,
    var(--color-primary-400) 20%,
    var(--color-primary-300) 25%,
    var(--color-primary-500) 30%
  );
  background-image: var(--white-gradient), var(--aurora);
  background-position:
    50% 50%,
    50% 50%;
  background-size: 300%, 200%;
  --white-gradient: repeating-linear-gradient(
    100deg,
    white 0%,
    white 7%,
    transparent 10%,
    transparent 12%,
    white 16%
  );
}

/* Retaining the after pseudo-element styles */
.aurora-background-gradient-after::after {
  background-attachment: fixed;
  background-image: var(--white-gradient), var(--aurora);
  background-size: 200% 100%;
  content: "";
  inset: 0;
  mix-blend-mode: difference;
  position: absolute;
}

/* Animation for the after pseudo-element */
.aurora-gradient-animation::after {
  animation: animate-aurora 60s linear infinite;
}

@keyframes animate-aurora {
  0% {
    background-position:
      50% 50%,
      50% 50%;
  }
  100% {
    background-position:
      350% 50%,
      350% 50%;
  }
}
</style>
