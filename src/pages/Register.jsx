import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [district, setDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted (backend coming soon)");
  };

  return (
    <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
        Register as Donor 🩸
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name" className="input input-bordered w-full" required />
        <input type="email" placeholder="Email" className="input input-bordered w-full" required />
        <input type="password" placeholder="Password" className="input input-bordered w-full" required />
        <input type="password" placeholder="Confirm Password" className="input input-bordered w-full" required />

        <select className="select select-bordered w-full" required>
          <option disabled selected>Select Blood Group</option>
          {bloodGroups.map((bg) => <option key={bg}>{bg}</option>)}
        </select>

        <select className="select select-bordered w-full" required onChange={handleDistrictChange}>
          <option disabled selected>Select District</option>
          {districts.map((dist) => <option key={dist}>{dist}</option>)}
        </select>

        <select className="select select-bordered w-full" required>
          <option disabled selected>Select Upazila</option>
          {upazilas.map((upa) => <option key={upa}>{upa}</option>)}
        </select>

        <input type="file" className="file-input file-input-bordered w-full" accept="image/*" />

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
