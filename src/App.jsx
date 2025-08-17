import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DonationRequests from "./pages/DonationRequests";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="p-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donation-requests" element={<DonationRequests />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
