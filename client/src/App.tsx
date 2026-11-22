import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useAuthInitialization } from "./features/auth/hooks/useAuthInitialization";
import CustomLoader from "./shared/CustomLoader";
import appRoutes from "./routes/appRoutes";
import "./App.css";

function App() {
  const { isLoading } = useAuthInitialization();
  const routes = useRoutes(appRoutes);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center">
        <CustomLoader />
      </div>
    );
  }

  return (
    <div
      // data-theme="pastel"
      className="min-h-screen w-full bg-gray-900 text-white relative overflow-hidden"
    >
      <Toaster position="bottom-center" reverseOrder={true} />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>
      {/* <Header /> */}

      <div className="h-screen relative z-50">
        <Suspense fallback={<CustomLoader />}>{routes}</Suspense>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
