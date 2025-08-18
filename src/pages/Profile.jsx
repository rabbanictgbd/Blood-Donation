import { useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import DistrictUpazilaSelector from "../components/DistrictUpazilaSelector";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState({ district: "", upazila: "" });
  const handleLocationChange = useCallback((loc) => setLocation(loc), []);

  // ✅ Fetch current user from backend
  const { data: profile, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/users/${user?.email}`);
      if (!res.ok) throw new Error("Failed to fetch user profile");
      return res.json();
    },
    enabled: !!user?.email, // only run if email exists
  });

  // ✅ Mutation to update profile
  const updateMutation = useMutation({
    mutationFn: async (updatedUser) => {
      const res = await fetch(`http://localhost:3000/api/users/${profile.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user?.email]); // refresh user data
      setIsEditing(false);
      Swal.fire("Success", "Profile updated successfully!", "success");
    },
    onError: (err) => Swal.fire("Error", err.message, "error"),
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (!profile) return <p className="text-center">No profile found.</p>;

  // ✅ Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    updateMutation.mutate({
      name: form.name.value,
      bloodGroup: form.bloodGroup.value,
      district: location.district || profile.district,
      upazila: location.upazila || profile.upazila,
      image: profile.image,
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
        My Profile 🩸
      </h2>

      <div className="flex justify-center mb-4">
        <img
          className="rounded-full w-24 h-24 object-cover"
          src={profile.image}
          alt="avatar"
        />
      </div>

      {/* ✅ Edit Button */}
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-primary btn-sm mb-4"
        >
          Edit
        </button>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          defaultValue={profile.name}
          className="input input-bordered w-full"
          disabled={!isEditing}
        />

        <input
          name="email"
          type="email"
          value={profile.email}
          className="input input-bordered w-full bg-gray-100"
          disabled
        />

        <select
          name="bloodGroup"
          defaultValue={profile.bloodGroup}
          className="select select-bordered w-full"
          disabled={!isEditing}
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <DistrictUpazilaSelector
          defaultDistrict={profile.district}
          defaultUpazila={profile.upazila}
          onChange={handleLocationChange}
          disabled={!isEditing}
        />

        {isEditing && (
          <button type="submit" className="btn btn-success w-full">
            Save
          </button>
        )}
      </form>
    </div>
  );
}
