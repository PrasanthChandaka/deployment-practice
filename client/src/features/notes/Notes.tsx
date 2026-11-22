import { Edit, Trash2 } from "lucide-react";
import Button from "../../shared/Button";
import CustomLoader from "../../shared/CustomLoader";
import { useNotesList } from "./hooks/useNotesList";
import { useNavigate } from "react-router-dom";
import FeatureHeader from "../../components/FeatureHeader";
import NotesLayout from "./NotesLayout";
import { motion } from "framer-motion";

interface Note {
  _id: string;
  user: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Notes = () => {
  const { data, isLoading } = useNotesList();
  const navigate = useNavigate();
  if (isLoading) return <CustomLoader />;

  const handleCreateNote = () => {
    navigate("/notes/create");
  };

  const handleEditNote = (id: string, note: any) => {
    navigate(`/notes/update/${id}`, { state: note });
  };

  const handleDeleteNote = (id: string) => {
    console.log("Delete note:", id);
  };

  return (
    <NotesLayout>
      <FeatureHeader title="Notes" handler={handleCreateNote} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto"
      >
        <table className="w-full border-collapse border border-gray-600">
          <thead className="bg-gray-900">
            <tr>
              <th className="border border-gray-600 p-3 text-left">Title</th>
              <th className="border border-gray-600 p-3 text-left">
                Description
              </th>
              <th className="border border-gray-600 p-3 text-left">Status</th>
              <th className="border border-gray-600 p-3 text-left">Created</th>
              <th className="border border-gray-600 p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.notes && data.notes?.length > 0 ? (
              data.notes?.map((note: Note) => (
                <tr key={note._id} className="">
                  <td className="border border-gray-600 p-3 font-medium">
                    {note.title}
                  </td>
                  <td className="border border-gray-600 p-3">
                    {note.description}
                  </td>
                  <td className="border border-gray-600 p-3">
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        note.completed
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {note.completed ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="border border-gray-600 p-3 text-sm">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-600 p-3 text-center">
                    <Button
                      onClick={() => handleEditNote(note._id, note)}
                      className="bg-transparent hover:bg-yellow-600"
                    >
                      <Edit size={20} />
                    </Button>
                    <Button
                      onClick={() => handleDeleteNote(note._id)}
                      className="bg-transparent hover:bg-red-600"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="border border-gray-600 p-3 text-center text-gray-500"
                >
                  No notes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </NotesLayout>
  );
};

export default Notes;
