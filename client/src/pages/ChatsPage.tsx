import { lazy, Suspense } from "react";
import CustomLoader from "../shared/CustomLoader";
const Chats = lazy(() => import("../features/chats/Chats"));

const ChatsPage = () => (
  <Suspense fallback={<CustomLoader />}>
    <Chats />
  </Suspense>
);
export default ChatsPage;
