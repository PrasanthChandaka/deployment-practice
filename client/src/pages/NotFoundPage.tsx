import { Suspense, lazy } from "react";
import CustomLoader from "../shared/CustomLoader";

const NotFound = lazy(() => import("../shared/NotFound"));

const NotFoundPage = () => (
  <Suspense fallback={<CustomLoader />}>
    <NotFound />
  </Suspense>
);

export default NotFoundPage;
