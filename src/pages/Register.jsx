import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

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
      setError("Passwords do not match!");
      return;
    }

    try {
      await register(email, password, name); // Calls AuthProvider register()
      console.log("Registered:", { name, email, bloodGroup, districtValue, upazila });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
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
