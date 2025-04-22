<template>
  <Editor
    v-if="note"
    ref="editor"
    v-model:content="note.content"
    v-model:title="note.title"
    class="overflow-y-auto size-full bg-gray-50"
    name="editor"
  />
</template>

<script lang="ts" setup>
import { debounce } from "es-toolkit/compat";
import Editor from "~/components/editor/index.vue";
import { z } from "zod";

const { noteApi } = useNote();
const noteWs = useWs(() => ws.note());
const note = ref<NonNullable<Awaited<ReturnType<typeof api.note.get>>>>({
  title: "",
  content: "",
});
const abortController = ref(new AbortController());
const saveNote = debounce(
  async () => {
    noteWs.send({ topic: "message", data: note.value });
    await noteWs.waitMessage(NOTE.TOPIC.MESSAGE);
    noteApi.refresh();
  },
  1500,
  { maxWait: 5000 },
);
const editor = ref<InstanceType<typeof Editor>>();
watch(
  note,
  () => {
    editor.value?.clearHint();
    saveNote();
  },
  { deep: true },
);

const getNoteId = () => z.coerce.number().safeParse(useRoute().params.id).data!;

const { isSuccess } = useApi(() =>
  api.note.get(getNoteId()).then((res) => {
    if (!res) return note.value;
    note.value = res;
  }),
);
const getHint = debounce(async () => {
  const text = editor.value?.getText();
  if (!text) return;
  const lastChar = text.slice(-1);
  const lastTwoChars = text.slice(-2);
  if (lastTwoChars === "  " || lastChar !== " ") return;
  if (lastChar === " " && lastTwoChars !== "  ") {
    abortController.value.abort();
    abortController.value = new AbortController();
    noteWs.send({ topic: NOTE.TOPIC.ABORT_HINT, data: text });
    noteWs.send({ topic: NOTE.TOPIC.HINT, data: text });
    await noteWs
      .waitMessage<string>(NOTE.TOPIC.HINT, {
        signal: abortController.value.signal,
      })
      .then((res) => {
        console.log("Hint received", res);
        return res && editor.value?.setHint(res);
      })
      .catch(() => {
        console.log("Hint request aborted");
      });
  }
}, 500);

/*
defineShortcuts(
  {
    tab: {
      usingInput: true,
      handler: () => {
        const hint = editor.value?.getHint();
        const text = editor.value?.getText();
        if (!hint || !text) return;
        editor.value?.applyHint();
      },
    },
    " ": {
      usingInput: true,
      handler: () => {
        getHint();
        editor.value?.addText(" ");
      },
    },
  },
  {},
);
*/
</script>
