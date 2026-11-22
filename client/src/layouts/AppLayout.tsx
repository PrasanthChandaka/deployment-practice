import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <div className="h-full overflow-hidden relative z-50 flex flex-col">
      {/* <Header /> */}
      <div className="h-full overflow-auto flex">
        <Sidebar />
        <main className="overflow-auto flex-1 m:px-6 p-3">
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
