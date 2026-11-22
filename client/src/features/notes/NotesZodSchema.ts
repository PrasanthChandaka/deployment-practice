import z from "zod";

export const notesSchema = z.object({
  user: z.string().trim().nonempty("userId is required!"),
  title: z.string().trim().nonempty("Title is required."),
  description: z.string().trim().nonempty("Description is required"),
  completed: z.boolean().optional(),
});
export const updateNotesSchema = z.object({
  id: z.string().nonempty("noteId is required"),
  user: z.string().trim().nonempty("userId is required!"),
  title: z.string().trim().nonempty("Title is required."),
  description: z.string().trim().nonempty("Description is required"),
  completed: z.boolean().optional(),
});
