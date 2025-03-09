<template>
  <Editor
    v-if="note"
    ref="editor"
    v-model:content="note.content"
    v-model:title="note.title"
    class="overflow-y-auto size-full bg-gray-50"
    @click="$refs.editor?.clearHint()"
    @keydown="$refs.editor?.clearHint()"
  />
</template>

<script lang="ts" setup>
import { debounce } from "es-toolkit/compat";
import Editor from "~/components/editor/index.vue";

const noteWs = useWs(() => ws.note());
const note = ref<NonNullable<Awaited<ReturnType<typeof api.note.get>>>>({
  title: "",
  content: "",
});

watch(
  note,
  debounce(() => noteWs.send({ topic: "message", data: note.value }), 1500, {
    maxWait: 5000,
  }),
  { deep: true },
);

const editor = ref<InstanceType<typeof Editor>>();

const { isSuccess } = useApi(() =>
  api.note.get(1).then((res) => {
    if (!res) return note.value;
    note.value = res;
  }),
);

const cache: Record<string, string> = {};

defineShortcuts(
  {
    tab: {
      usingInput: true,
      handler: () => editor.value?.addText(cache[note.value.content] ?? ""),
    },
  },
  {},
);
</script>
