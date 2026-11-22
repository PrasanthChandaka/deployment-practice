const LOGOUT_STORAGE_KEY = "next-level-client:auth-logged-out";

export const markLoggedOut = () => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOGOUT_STORAGE_KEY, "true");
};

export const clearLoggedOutFlag = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LOGOUT_STORAGE_KEY);
};

export const isLoggedOutFlagSet = () => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(LOGOUT_STORAGE_KEY) === "true";
};
