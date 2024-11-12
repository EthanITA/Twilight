<script lang="ts" setup>
const value = defineModel<string>({ default: "" });
const valueRef = ref<HTMLElement | null>(null);

defineProps<{
  placeholder?: string;
  tag?: string;
}>();

const updateContent = () => {
  if (valueRef.value) {
    valueRef.value.innerText = value.value;
    // Since updating the innerText makes the cursor jump to the start
    // we need to move it back to the end
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(valueRef.value);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }
};

watch(value, updateContent);
onMounted(updateContent);
</script>

<template>
  <component
    :is="tag ?? 'div'"
    ref="valueRef"
    :data-placeholder="placeholder"
    class="!min-w-full text-4xl font-bold !outline-0 border-0"
    contentEditable="true"
    @input="value = $event.target.innerText"
  />
</template>

<style scoped>
[contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-placeholder);
  @apply text-gray-400 pointer-events-none;
}
</style>
