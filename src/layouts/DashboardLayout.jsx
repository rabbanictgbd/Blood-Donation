import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className=" bg-red-900 text-white p-5">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-3">
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/dashboard/profile">Profile</a></li>
          <li><a href="/requests">Request</a></li>
          <li><a href="/my-donation-requests">My Requests</a></li>
          <li><a href="/all-donation-requests">All Requests</a></li>
          <li><a href="/all-users">All Users</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
