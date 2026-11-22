import type z from "zod";
import FeatureHeader from "../../components/FeatureHeader";
import NotesLayout from "./NotesLayout";
import { updateNotesSchema } from "./NotesZodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/Auth.store";
import { motion } from "framer-motion";
import Button from "../../shared/Button";
import { useUpdateNotes } from "./hooks/useUpdateNotes";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

type Schema = z.infer<typeof updateNotesSchema>;

const UpdateNotes = () => {
  const { user } = useAuthStore();
  const { mutate, isPending } = useUpdateNotes();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const noteData = location.state;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateNotesSchema),
    defaultValues: {
      id: id || noteData?.id,
      user: user?.id || noteData?.user,
      title: noteData?.title || "",
      description: noteData?.description || "",
      completed: noteData?.completed,
    },
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/notes");
      },
    });
  };

  if (!noteData) {
    return <Navigate to="/notes" />;
  }

  return (
    <NotesLayout>
      <FeatureHeader title="Edit And Update Your Notes" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="mt-1 relative rounded-md shadow-sm">
            <label htmlFor="title" className="mb-2">
              Enter the title
            </label>
            <input
              id="title"
              {...register("title")}
              type="text"
              placeholder="Enter title"
              className="className='block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm'"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mt-1 relative rounded-md shadow-sm">
            <label htmlFor="description" className="mb-5">
              Enter the description
            </label>
            <textarea
              id="description"
              rows={5}
              cols={10}
              {...register("description")}
              placeholder="Enter description"
              className="className='block w-full px-3 py-2  bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm'"
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="self-end">
            <Button type="submit" isLoading={isPending}>
              Update
            </Button>
          </div>
        </form>
      </motion.div>
    </NotesLayout>
  );
};

export default UpdateNotes;
