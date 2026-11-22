import { Suspense, lazy } from "react";
import CustomLoader from "../shared/CustomLoader";

const SignIn = lazy(() => import("../features/auth/SignIn"));

const SignInPage = () => (
  <Suspense fallback={<CustomLoader />}>
    <SignIn />
  </Suspense>
);

export default SignInPage;
