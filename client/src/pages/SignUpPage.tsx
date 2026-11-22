import { Suspense, lazy } from "react";
import CustomLoader from "../shared/CustomLoader";

const SignUp = lazy(() => import("../features/auth/SignUp"));

const SignUpPage = () => (
  <Suspense fallback={<CustomLoader />}>
    <SignUp />
  </Suspense>
);

export default SignUpPage;
