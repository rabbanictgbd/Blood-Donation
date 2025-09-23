import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import LeftSide from "../components/LeftSide";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
    <LeftSide></LeftSide>
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
      
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
