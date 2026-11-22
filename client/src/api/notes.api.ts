import type { CreateNotesPayload } from "../features/notes/hooks/useCreateNotes";
import type { UpdateNotesPayload } from "../features/notes/hooks/useUpdateNotes";
import { privateApi } from "./axios";

export const getNotes = (payload: { id: string | number | undefined }) =>
  privateApi.get("/api/notes", { params: payload });

export const createNotes = (payload: CreateNotesPayload) =>
  privateApi.post("/api/notes/create", payload);

export const updateNotes = (payload: UpdateNotesPayload) =>
  privateApi.put("/api/notes/update", payload);
