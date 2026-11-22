import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative z-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
