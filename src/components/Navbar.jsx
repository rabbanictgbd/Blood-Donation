import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider"; // adjust path

export default function Navbar() {
  const { user, role, logout } = useContext(AuthContext); // role will come from backend
  const [menuOpen, setMenuOpen] = useState(false);

  // Nav items based on role
  const navConfig = {
    guest: [
      { path: "/", label: "Home" },
      { path: "/blogs", label: "Blogs" },
      { path: "/login", label: "Login" },
      { path: "/register", label: "Register" },
      { path: "/dashboard", label: "Dashboard" },
      { path: "/requests", label: "Request" },
    ],
    donor: [
      { path: "/", label: "Home" },
      { path: "/donation-requests", label: "My Requests" },
      { path: "/create-donation-request", label: "Create Request" },
      { path: "/dashboard", label: "Dashboard" },
      { path: "/dashboard/profile", label: "Profile" },
    ],
    volunteer: [
      { path: "/", label: "Home" },
      { path: "/all-blood-donation-request", label: "All Requests" },
      { path: "/dashboard", label: "Dashboard" },
      { path: "/dashboard/profile", label: "Profile" },
    ],
    admin: [
      { path: "/", label: "Home" },
      { path: "/dashboard", label: "Dashboard" },
      { path: "/all-users", label: "Users" },
      { path: "/content-management", label: "Content" },
      { path: "/dashboard/profile", label: "Profile" },
    ],
  };

  const navItems = navConfig[role || "guest"];
  const handleLogout = () => {
    logout()
  }

  return (
    <div className="navbar bg-base-100 shadow-md px-5">
      {/* Logo Left */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-red-600">
          🩸 Blood Donation
        </Link>
      </div>

      {/* Desktop Menu Right */}
      <div className="flex-none hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${isActive
                    ? "bg-red-100 text-red-600 font-semibold"
                    : "hover:bg-gray-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {user && (
            <li>
              <div className="dropdown dropdown-hover dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-error text-white m-1 cursor-pointer">
                  {user.email}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li><a href="dashboard/profile">Profile</a></li>
                  <li><a href="/dashboard">Dashboard</a></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </li>
          )}

        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="flex-none lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-ghost text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-3 w-48 lg:hidden z-50">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md ${isActive
                      ? "bg-red-100 text-red-600 font-semibold"
                      : "hover:bg-gray-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            {user && (
              <li>
                <button className="btn btn-error btn-sm text-white w-full">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
