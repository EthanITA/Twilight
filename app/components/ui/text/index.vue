<script lang="ts" setup>
import { cva, type VariantProps } from "class-variance-authority";
import { computed } from "vue";

const text = cva("text", {
  variants: {
    type: {
      title: "text-4xl md:text-5xl",
      subtitle: "text-3xl md:text-4xl",
      heading: "text-2xl font-semibold",
      subheading: "text-lg md:text-xl font-medium",
      "section-header": "text-base md:text-lg uppercase tracking-wide",
      body: "text-base",
      quote: "italic",
      caption: "text-sm text-gray-500",
    },
    variant: {
      bold: "font-bold",
      semibold: "font-semibold",
      cursive: "font-serif italic",
    },
  },
  defaultVariants: {
    type: "body",
    variant: undefined,
  },
});

type TextProps = VariantProps<typeof text> & {};

const props = defineProps<{
  type?: TextProps["type"];
  variant?: TextProps["variant"];
}>();
const cls = computed(() => text(props));
</script>

<template>
  <p :class="cls">
    <slot />
  </p>
</template>

<style scoped></style>
