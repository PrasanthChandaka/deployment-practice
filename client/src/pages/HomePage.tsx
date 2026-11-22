import { Suspense, lazy } from "react";
import CustomLoader from "../shared/CustomLoader";

const Home = lazy(() => import("../features/home/Home"));

const HomePage = () => (
  <Suspense fallback={<CustomLoader />}>
    <Home />
  </Suspense>
);

export default HomePage;
