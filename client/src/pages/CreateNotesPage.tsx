import { Suspense, lazy } from "react";
import CustomLoader from "../shared/CustomLoader";

const CreateNotes = lazy(() => import("../features/notes/CreateNotes"));

const CreateNotesPage = () => (
  <Suspense fallback={<CustomLoader />}>
    <CreateNotes />
  </Suspense>
);

export default CreateNotesPage;
