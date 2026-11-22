import type { RouteObject } from "react-router-dom";
import NotesPage from "../pages/NotesPage";
import CreateNotesPage from "../pages/CreateNotesPage";
import UpdateNotesPage from "../pages/UpdateNotesPage";

const noteRoutes: RouteObject[] = [
  {
    path: "notes",
    element: <NotesPage />,
  },
  {
    path: "notes/create",
    element: <CreateNotesPage />,
  },
  {
    path: "notes/update/:id",
    element: <UpdateNotesPage />,
  },
];

export default noteRoutes;
