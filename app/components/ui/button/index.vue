<script lang="ts" setup>
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("btn", {
  variants: {
    color: {
      neutral: "btn-neutral text-neutral-content",
      primary: "btn-primary text-primary-content",
      secondary: "btn-secondary text-secondary-content",
      accent: "btn-accent text-accent-content",
      info: "btn-info text-info-content",
      success: "btn-success text-success-content",
      warning: "btn-warning text-warning-content",
      error: "btn-error text-error-content",
    },
    variant: {
      outline: "btn-outline",
      dash: "btn-dash",
      soft: "btn-soft",
      ghost: "btn-ghost",
      link: "btn-link",
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      xl: "btn-xl",
    },
    modifier: {
      wide: "btn-wide",
      block: "btn-block",
      circle: "btn-circle",
      square: "btn-square",
    },
  },
  defaultVariants: { size: "md" },
});

type ButtonProps = VariantProps<typeof button> & {
  disabled?: boolean;
};

const props = defineProps<{
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  modifier?: ButtonProps["modifier"];
  disabled?: ButtonProps["disabled"];
}>();
const cls = computed(() => button(props));
</script>

<template>
  <button
    :class="[cls, { 'btn-disabled': props.disabled }]"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>
