import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Profile() {
  const [user, setUser] = useState(null); // store user data
  const [isEditing, setIsEditing] = useState(false); // toggle edit mode
  const [formData, setFormData] = useState({}); // for form state

  // fetch user (example: logged-in user’s email comes from localStorage/session)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users/me", {
          credentials: "include", // if cookie-based auth
        });
        const data = await res.json();
        setUser(data);
        setFormData(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle save
  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", "Profile updated successfully!", "success");
        setUser(data); // update local user state
        setIsEditing(false); // switch back to read-only
      } else {
        Swal.fire("Error", data.message || "Failed to update profile", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-red-600">My Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-sm btn-warning"
          >
            Edit
          </button>
        ) : (
          <button onClick={handleSave} className="btn btn-sm btn-success">
            Save
          </button>
        )}
      </div>

      <form className="space-y-4">
        {/* Avatar */}
        <div className="flex items-center space-x-4">
          <img
            src={user.image}
            alt="avatar"
            className="w-16 h-16 rounded-full border"
          />
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          disabled={!isEditing}
        />

        {/* Email (not editable) */}
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          className="input input-bordered w-full bg-gray-100"
          disabled
        />

        {/* Blood Group */}
        <select
          name="bloodGroup"
          value={formData.bloodGroup || ""}
          onChange={handleChange}
          className="select select-bordered w-full"
          disabled={!isEditing}
        >
          <option disabled>Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* District */}
        <input
          type="text"
          name="district"
          value={formData.district || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          disabled={!isEditing}
        />

        {/* Upazila */}
        <input
          type="text"
          name="upazila"
          value={formData.upazila || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          disabled={!isEditing}
        />
      </form>
    </div>
  );
}
