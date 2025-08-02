import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
 const navItems = [
  { path: "/", label: "Home", roles: ["guest", "donor", "volunteer", "admin"] },
  { path: "/donation-requests", label: "Donation Requests", roles: ["donor", "volunteer", "admin"] },
  { path: "/blogs", label: "Blogs", roles: ["guest", "donor", "volunteer", "admin"] },
  { path: "/dashboard", label: "Dashboard", roles: ["donor", "volunteer", "admin"] },
  { path: "/login", label: "Login", roles: ["guest"] },
  { path: "/register", label: "Register", roles: ["guest"] },
];


  return (
<div className="navbar bg-base-100 shadow-md px-5">
  {/* Logo */}
  <div className="flex-1">
    <Link to="/" className="text-2xl font-bold text-red-600">🩸 Blood Donation</Link>
  </div>

  {/* Desktop Menu */}
  <div className="hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-2">
      {navItems.map(item => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md ${
                isActive ? "bg-red-100 text-red-600 font-semibold" : "hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>

  {/* Mobile Menu */}
  <div className="dropdown lg:hidden">
    <div tabIndex={0} role="button" className="btn btn-ghost">
      ☰
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 z-[1] w-52 p-2"
    >
      {navItems.map(item => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive ? "text-red-500 font-bold" : ""
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
</div>

  );
}
