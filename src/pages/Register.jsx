import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [error, setError] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const districts = ["Dhaka", "Chattogram", "Rajshahi"];
  const upazilaData = {
    Dhaka: ["Dhanmondi", "Gulshan", "Mirpur"],
    Chattogram: ["Pahartali", "Panchlaish", "Kotwali"],
    Rajshahi: ["Boalia", "Motihar", "Rajpara"],
  };

  const handleDistrictChange = (e) => {
    const selected = e.target.value;
    setDistrict(selected);
    setUpazilas(upazilaData[selected] || []);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;
  const bloodGroup = e.target.bloodGroup.value;
  const districtValue = e.target.district.value;
  const upazila = e.target.upazila.value;

  if (password !== confirmPassword) {
    Swal.fire("Error", "Passwords do not match!", "error");
    return;
  }

  try {
    // Step 1: Save to MongoDB via your custom Express API
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, bloodGroup, district: districtValue, upazila }),
    });

    const data = await res.json();

    if (!res.ok) {
      Swal.fire("Error", data.message || "Failed to save to MongoDB", "error");
      return;
    }

    // Step 2: If MongoDB save succeeded, now create Firebase Auth account
    await register(email, password, name);

    Swal.fire("Success", "Registration successful!", "success");
    navigate("/dashboard");

  } catch (err) {
    Swal.fire("Error", err.message, "error");
  }
};


  return (
    <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
        Register as Donor 🩸
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Full Name" className="input input-bordered w-full" required />
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input input-bordered w-full" required />

        <select name="bloodGroup" className="select select-bordered w-full" required>
          <option disabled selected>Select Blood Group</option>
          {bloodGroups.map((bg) => <option key={bg}>{bg}</option>)}
        </select>

        <select name="district" className="select select-bordered w-full" required onChange={handleDistrictChange}>
          <option disabled selected>Select District</option>
          {districts.map((dist) => <option key={dist}>{dist}</option>)}
        </select>

        <select name="upazila" className="select select-bordered w-full" required>
          <option disabled selected>Select Upazila</option>
          {upazilas.map((upa) => <option key={upa}>{upa}</option>)}
        </select>

        <input type="file" className="file-input file-input-bordered w-full" accept="image/*" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="btn btn-error w-full text-white">Register</button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-red-500 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}
