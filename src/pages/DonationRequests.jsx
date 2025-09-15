import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import DistrictUpazilaSelector from "../components/DistrictUpazilaSelector";

export default function RequestBlood() {
  const [location, setLocation] = useState({ district: "", upazila: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleLocationChange = useCallback((loc) => setLocation(loc), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const payload = {
      requesterName: form.requesterName.value.trim(),
      patientName: form.patientName.value.trim(),
      bloodGroup: form.bloodGroup.value,
      units: Number(form.units.value) || 1,
      hospital: form.hospital.value.trim(),
      contactPhone: form.contactPhone.value.trim(),
      requiredDate: form.requiredDate.value, // yyyy-mm-dd
      notes: form.notes.value.trim(),
      district: location.district,
      upazila: location.upazila,
      createdAt: new Date().toISOString(),
      status: "open",
    };

    // basic client-side validation
    if (!payload.requesterName || !payload.patientName || !payload.bloodGroup || !payload.hospital || !payload.contactPhone) {
      Swal.fire("Error", "Please fill all required fields.", "error");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", "Blood request submitted successfully.", "success");
        form.reset();
        setLocation({ district: "", upazila: "" });
      } else {
        Swal.fire("Error", data.message || "Failed to submit request", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Network error", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-red-600">Request Blood</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="requesterName" type="text" placeholder="Your full name *" className="input input-bordered w-full" required />
          <input name="patientName" type="text" placeholder="Patient full name *" className="input input-bordered w-full" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select name="bloodGroup" className="select select-bordered w-full" required defaultValue="">
            <option value="" disabled>Select Blood Group *</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          <input name="units" type="number" min="1" placeholder="Units (bags) *" className="input input-bordered w-full" defaultValue={1} required />

          <input name="requiredDate" type="date" className="input input-bordered w-full" />
        </div>

        <input name="hospital" type="text" placeholder="Hospital / Address *" className="input input-bordered w-full" required />

        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <DistrictUpazilaSelector
            defaultDistrict={location.district}
            defaultUpazila={location.upazila}
            onChange={handleLocationChange}
            disabled={false}
          />
        </div>

        <input name="contactPhone" type="tel" placeholder="Contact phone number *" className="input input-bordered w-full" required />

        <textarea name="notes" placeholder="Additional notes (optional)" className="textarea textarea-bordered w-full" rows={4} />

        <div className="flex space-x-2">
          <button type="submit" className="btn btn-error text-white" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={(ev) => {
              ev.preventDefault();
              ev.target.form && ev.target.form.reset();
              setLocation({ district: "", upazila: "" });
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
