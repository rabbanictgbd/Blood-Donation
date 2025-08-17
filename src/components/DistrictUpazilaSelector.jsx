import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchDistricts = async () => {
  const res = await fetch("http://localhost:3000/api/districts");
  if (!res.ok) throw new Error("Failed to fetch districts");
  return res.json();
};

const fetchUpazilas = async (districtId) => {
  if (!districtId) return [];
  const res = await fetch(`http://localhost:3000/api/upazilas/${districtId}`);
  if (!res.ok) throw new Error("Failed to fetch upazilas");
  return res.json();
};

const DistrictUpazilaSelector = ({ defaultDistrict = "", defaultUpazila = "", onChange }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(defaultDistrict);
  const [selectedUpazila, setSelectedUpazila] = useState(defaultUpazila);

  // Districts
  const { data: districts = [], isLoading: loadingDistricts } = useQuery({
    queryKey: ["districts"],
    queryFn: fetchDistricts,
  });

  // Upazilas
  const { data: upazilas = [], isLoading: loadingUpazilas } = useQuery({
    queryKey: ["upazilas", selectedDistrict],
    queryFn: () => fetchUpazilas(selectedDistrict),
    enabled: !!selectedDistrict,
  });

  // Emit changes only when selection changes
  useEffect(() => {
    onChange?.({ district: selectedDistrict, upazila: selectedUpazila });
  }, [selectedDistrict, selectedUpazila]); // no unnecessary deps

  return (
    <div className="space-y-4">
      <div>
        <label className="font-semibold">Select District</label>
        <select
          className="select select-bordered w-full"
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedUpazila(""); // reset upazila
          }}
          value={selectedDistrict}
        >
          <option value="">-- Select a district --</option>
          {loadingDistricts ? (
            <option disabled>Loading...</option>
          ) : (
            districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))
          )}
        </select>
      </div>

      {selectedDistrict && (
        <div>
          <label className="font-semibold">Select Upazila</label>
          <select
            className="select select-bordered w-full"
            value={selectedUpazila}
            onChange={(e) => setSelectedUpazila(e.target.value)}
          >
            <option value="">-- Select an upazila --</option>
            {loadingUpazilas ? (
              <option disabled>Loading...</option>
            ) : (
              upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
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
