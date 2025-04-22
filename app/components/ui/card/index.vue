<script lang="ts" setup>
import { cva, type VariantProps } from "class-variance-authority";

const card = cva("card", {
  variants: {
    variant: {
      border: "card-border",
      dash: "card-dash",
    },
    modifier: {
      side: "card-side",
      imageFull: "image-full",
    },
    size: {
      xs: "card-xs",
      sm: "card-sm",
      md: "card-md",
      lg: "card-lg",
      xl: "card-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type CardProps = VariantProps<typeof card>;

const props = defineProps<{
  variant?: CardProps["variant"];
  modifier?: CardProps["modifier"];
  size?: CardProps["size"];
}>();
const cls = computed(() => card(props));
</script>

<template>
  <div :class="cls" class="w-96 card">
    <div class="card-body">
      <div v-if="$slots.header" class="card-title">
        <slot name="header" />
      </div>
      <slot>
        <div class="h-2" />
      </slot>
      <div v-if="$slots.footer" class="card-actions">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
