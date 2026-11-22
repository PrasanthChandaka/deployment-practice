import { Suspense, lazy } from "react";
import CustomLoader from "../shared/CustomLoader";

const Forbidden = lazy(() => import("../shared/Forbidden"));

const ForbiddenPage = () => (
  <Suspense fallback={<CustomLoader />}>
    <Forbidden />
  </Suspense>
);

export default ForbiddenPage;
