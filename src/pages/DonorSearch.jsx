import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthProvider";
import DistrictUpazilaSelector from "../components/DistrictUpazilaSelector";

const DonorSearch = () => {
  const { serverApi } = useContext(AuthContext);
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const [filters, setFilters] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // Fetch districts on mount
  useEffect(() => {
    fetch(`${serverApi}/api/districts`)
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, [serverApi]);

  // Fetch upazilas when district changes
  useEffect(() => {
    if (!filters.district) {
      setUpazilas([]);
      return;
    }
    fetch(`${serverApi}/api/upazilas/${filters.district}`)
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, [filters.district, serverApi]);

  const handleSearch = async () => {
    setLoading(true);
    setDonors([]);
    const query = new URLSearchParams(filters).toString();
    try {
      const res = await fetch(`${serverApi}/api/users?${query}`);
      const data = await res.json();
      setDonors(data.users || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-600">
        🩸 Search Donors
      </h2>

      {/* Search Form */}
      <div className="flex flex-wrap gap-4 items-end mb-6">
        {/* Blood Group */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Blood Group</label>
          <select
            value={filters.bloodGroup}
            onChange={(e) =>
              setFilters({ ...filters, bloodGroup: e.target.value })
            }
            className="select select-bordered"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* District + Upazila */}
        <div className="flex gap-2">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">District</label>
            <select
              value={filters.district}
              onChange={(e) =>
                setFilters({ ...filters, district: e.target.value, upazila: "" })
              }
              className="select select-bordered"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Upazila</label>
            <select
              value={filters.upazila}
              onChange={(e) =>
                setFilters({ ...filters, upazila: e.target.value })
              }
              className="select select-bordered"
            >
              <option value="">Select Upazila</option>
              {upazilas.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex flex-col justify-end">
          <button
            onClick={handleSearch}
            className="btn btn-error text-white"
          >
            Search
          </button>
        </div>
      </div>

      {/* Donor List */}
      {loading ? (
        <p className="text-center mt-10">Loading donors...</p>
      ) : donors.length === 0 ? (
        <p className="text-center mt-10">No donors found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <div key={donor._id} className="card bg-base-100 shadow-lg">
              <figure>
                <img
                  src={donor.image || "https://i.pravatar.cc/100"}
                  alt={donor.name}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{donor.name}</h3>
                <p>Email: {donor.email}</p>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>
                  Location: {donor.district}, {donor.upazila}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorSearch;
