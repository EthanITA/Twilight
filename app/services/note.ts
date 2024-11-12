import type { GetNote } from "~~/server/api/note/[id].get";
import baseApi, { type BaseApi } from "~/services/baseApi";
import type { PutNoteBody } from "~~/server/api/note/[id].put";
import type { PostNoteBody } from "~~/server/api/note/index.post";
import type { GetAllNotes } from "~~/server/api/note/index.get";

export default new (class Note {
  api: BaseApi;

  constructor() {
    this.api = baseApi("note");
  }

  getAll() {
    return this.api.get<GetAllNotes>("/");
  }

  get(id: number) {
    return this.api.get<GetNote>(`/${id}`);
  }

  save(id: number, body: PutNoteBody) {
    return this.api.put(`/${id}`, { body });
  }

  create(body: PostNoteBody) {
    return this.api.post("/", { body });
  }
})();
