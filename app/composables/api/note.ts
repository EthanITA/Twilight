import type {GetAllNotes} from "~~/server/api/note/index.get";
import type {GetNote} from "~~/server/api/note/[id].get";
import type {PutNoteBody} from "~~/server/api/note/[id].put";
import type {PostNoteBody} from "~~/server/api/note/index.post";

export default {
  getAll: () => $api<GetAllNotes>("/api/note"),
  get: (id: number) => $api<GetNote>(`/api/note/${id}`),
  save: (id: number, body: PutNoteBody) =>
    $api(`/api/note/${id}`, { body, method: "PUT" }),
  create: (body: PostNoteBody) => $api("/api/note", { body, method: "POST" }),
};
