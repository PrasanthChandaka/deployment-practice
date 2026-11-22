import type { RouteObject } from "react-router-dom";
import SettingsPage from "../pages/SettingsPage";

export const settingRoutes: RouteObject[] = [
  {
    path: "settings",
    element: <SettingsPage />,
  },
];
