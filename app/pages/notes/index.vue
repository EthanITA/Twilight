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

const ws = new WebSocket("/_ws/note");
const note = ref<NonNullable<Awaited<ReturnType<typeof api.note.get>>>>({
  title: "",
  content: "",
});

const saveNote = debounce(
  () => {
    ws.send(
      JSON.stringify({
        topic: "message",
        data: note.value,
      }),
    );
  },
  1500,
  { maxWait: 5000 },
);

watch(note, saveNote, { deep: true });
onMounted(() => {
  ws.onopen = () => console.log("connected");
  ws.onclose = () => console.log("disconnected");
  ws.onmessage = (e) => console.log("message", e.data);
  ws.onerror = (err) => console.error("error", err);
});

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

const { isPending } = useAction(
  debounce(async () => {
    const hint = await api.note.save(1, {
      ...note.value,
      hint: !!note.value.content,
    });
    if (hint) cache[note.value.content] = hint;
    editor.value?.setHint(cache[note.value.content] ?? hint);
    return hint;
  }, 1000),
  {
    deps: note,
    deep: true,
  },
);
</script>
