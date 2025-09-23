import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";


const LeftSide = () => {
  const {profile, user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
  }

  return (
    <aside className="bg-red-900 text-white p-5 min-h-screen w-64">
      {/* Top Section - Avatar + Name with Dropdown */}
      <div className="dropdown mb-6">
        <div tabIndex={0} role="button" className="flex items-center gap-3 cursor-pointer">
          <div className="avatar">
            <div className="w-12 rounded-full border-2 border-white">
              <img
                src={profile?.image || "https://i.ibb.co/6b0L4qV/avatar.png"}
                alt="avatar"
              />
            </div>
          </div>
          <p className="font-semibold">{profile?.name || "Guest"}</p>
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white text-red-900 rounded-box w-40"
        >
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}></button>
          </li>
        </ul>
      </div>

      {/* Dashboard Menu */}
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>
      <ul className="space-y-3">
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/dashboard">📊 Dashboard</Link></li>
        <li><Link to="/requests">📝 Request</Link></li>
        <li><Link to="/my-donation-requests">📌 My Requests</Link></li>
        <li><Link to="/all-donation-requests">📂 All Requests</Link></li>
        <li><Link to="/all-users">👥 All Users</Link></li>
        <li><Link to="/blogs">📰 Blogs</Link></li>
        <li><Link to="/dashboard/content-management">⚙ Manage Blogs</Link></li>
        <li><Link to="/dashboard/content-management/add-blog">➕ Add Blog</Link></li>
      </ul>
    </aside>
  );
};

export default LeftSide;
