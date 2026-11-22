import { Suspense, lazy } from "react";
import CustomLoader from "../shared/CustomLoader";

const UpdateNotes = lazy(() => import("../features/notes/UpdateNotes"));

const UpdateNotesPage = () => (
  <Suspense fallback={<CustomLoader />}>
    <UpdateNotes />
  </Suspense>
);

export default UpdateNotesPage;
