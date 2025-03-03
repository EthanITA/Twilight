import type { PutNoteBody } from "~~/server/api/note/[id].put";
import type { PostNoteBody } from "~~/server/api/note/index.post";
import type { ApiRoutes } from "~/composables/api";

const a: ApiRoutes = "/api/note/:id";
export default {
  getAll: () => $api("/api/note"),
  get: (id: number) =>
    $api(`/api/note/${id}` as "/api/note/:id", { method: "get" }),
  save: (id: number, body: PutNoteBody) =>
    $api(`/api/note/${id}` as "/api/note/:id", { body, method: "put" }),
  create: (body: PostNoteBody) =>
    $api("/api/note", { body, method: "post" }).then((res) => res),
};
