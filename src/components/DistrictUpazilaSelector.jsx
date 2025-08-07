import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchDistricts = async () => {
  const res = await fetch("http://localhost:3000/api/districts");
  return res.json();
};

const fetchUpazilas = async (districtId) => {
  const res = await fetch(`http://localhost:3000/api/upazilas/${districtId}`);
  return res.json();
};

const DistrictUpazilaSelector = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  
  const { data: districts = [], isLoading: loadingDistricts } = useQuery({
    queryKey: ["districts"],
    queryFn: fetchDistricts,
  });

  const {
    data: upazilas = [],
    isLoading: loadingUpazilas,
  } = useQuery({
    queryKey: ["upazilas", selectedDistrict],
    queryFn: () => fetchUpazilas(selectedDistrict),
    enabled: !!selectedDistrict, // only fetch when a district is selected
  });

  return (
    <div className="space-y-4">
      {/* District Dropdown */}
      <div>
        <label className="font-semibold">Select District</label>
        <select
          className="select select-bordered w-full"
          onChange={(e) => setSelectedDistrict(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            -- Select a district --
          </option>
          {loadingDistricts ? (
            <option>Loading...</option>
          ) : (
            districts.map((district) => (
              <option key={district._id} value={district._id}>
                {district.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Upazila Dropdown */}
      {selectedDistrict && (
        <div>
          <label className="font-semibold">Select Upazila</label>
          <select className="select select-bordered w-full">
            <option value="" disabled>
              -- Select an upazila --
            </option>
            {loadingUpazilas ? (
              <option>Loading...</option>
            ) : (
              upazilas.map((upazila) => (
                <option key={upazila._id} value={upazila._id}>
                  {upazila.name}
                </option>
              ))
            )}
          </select>
        </div>
      )}
    </div>
  );
};

export default DistrictUpazilaSelector;
