import { Suspense, lazy } from "react";
import CustomLoader from "../shared/CustomLoader";

const Notes = lazy(() => import("../features/notes/Notes"));

const NotesPage = () => (
  <Suspense fallback={<CustomLoader />}>
    <Notes />
  </Suspense>
);

export default NotesPage;
