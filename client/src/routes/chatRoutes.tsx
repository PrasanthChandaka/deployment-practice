import type { RouteObject } from "react-router-dom";
import ChatsPage from "../pages/ChatsPage";

export const chatRoutes: RouteObject[] = [
  {
    path: "/chats",
    element: <ChatsPage />,
  },
];
