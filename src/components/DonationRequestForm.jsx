import { useContext } from "react";
import DistrictUpazilaSelector from "./DistrictUpazilaSelector";
import { AuthContext } from "../context/AuthProvider";

export default function DonationRequestForm({
  mode = "create",       // "create" | "edit" | "view"
  request = {},          // prefilled data (edit/view)
  location = { district: "", upazila: "" }, 
  onLocationChange,      // handler for location
  onSubmit,              // callback for submit
  submitting = false,    // loading state
}) {
  const { user } = useContext(AuthContext);
  const readOnly = mode === "view";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit && mode !== "view") {
      const form = e.target;
      const payload = {
        requesterName: request?.requesterName || user?.displayName || "Anonymous",
        requesterEmail: request?.requesterEmail || user?.email || "N/A",
        recipientName: form.recipientName.value.trim(),
        recipientMobile: form.recipientMobile.value.trim(),
        district: location.district,
        upazila: location.upazila,
        hospital: form.hospital.value.trim(),
        address: form.address.value.trim(),
        bloodGroup: form.bloodGroup.value,
        donationDate: form.donationDate.value,
        donationTime: form.donationTime.value,
        requestMessage: form.requestMessage.value.trim(),
      };
      onSubmit(payload, form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Requester Info */}
      <div>
        <label className="block font-semibold mb-1">Requester Name</label>
        <input
          type="text"
          value={request?.requesterName || user?.displayName || ""}
          className="input input-bordered w-full bg-gray-100"
          readOnly
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Requester Email</label>
        <input
          type="email"
          value={request?.requesterEmail || user?.email || ""}
          className="input input-bordered w-full bg-gray-100"
          readOnly
        />
      </div>

      {/* Recipient Info */}
      <div className="flex gap-2 w-full">
        <div className="w-xl">
          <label className="block font-semibold mb-1">Recipient Name *</label>
          <input
            name="recipientName"
            type="text"
            defaultValue={request?.recipientName}
            className="input input-bordered w-full"
            required
            readOnly={readOnly}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Recipient Mobile *</label>
          <input
            name="recipientMobile"
            type="text"
            defaultValue={request?.recipientMobile}
            className="input input-bordered w-full"
            required
            readOnly={readOnly}
          />
        </div>
      </div>

      {/* District & Upazila */}
      <div>
        <label className="block font-semibold mb-1">Recipient Location *</label>
        <DistrictUpazilaSelector
          defaultDistrict={location.district}
          defaultUpazila={location.upazila}
          onChange={onLocationChange}
          disabled={readOnly}
        />
      </div>

      {/* Hospital & Address */}
      <div>
        <label className="block font-semibold mb-1">Hospital Name *</label>
        <input
          name="hospital"
          type="text"
          defaultValue={request?.hospital}
          className="input input-bordered w-full"
          required
          readOnly={readOnly}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Full Address Line *</label>
        <input
          name="address"
          type="text"
          defaultValue={request?.address}
          className="input input-bordered w-full"
          required
          readOnly={readOnly}
        />
      </div>

      {/* Blood Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold mb-1">Blood Group *</label>
          <select
            name="bloodGroup"
            className="select select-bordered w-full"
            defaultValue={request?.bloodGroup || ""}
            disabled={readOnly}
            required
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Donation Date *</label>
          <input
            name="donationDate"
            type="date"
            defaultValue={request?.donationDate}
            className="input input-bordered w-full"
            required
            readOnly={readOnly}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Donation Time *</label>
          <input
            name="donationTime"
            type="time"
            defaultValue={request?.donationTime}
            className="input input-bordered w-full"
            required
            readOnly={readOnly}
          />
        </div>
      </div>

      {/* Request Message */}
      <div>
        <label className="block font-semibold mb-1">Request Message *</label>
        <textarea
          name="requestMessage"
          rows={4}
          defaultValue={request?.requestMessage}
          className="textarea textarea-bordered w-full"
          required
          readOnly={readOnly}
        />
      </div>

      {/* Buttons */}
      {mode !== "view" && (
        <div className="flex space-x-2">
          <button
            type="submit"
            className="btn btn-error text-white"
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : mode === "create"
              ? "Submit Request"
              : "Update Request"}
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={(ev) => {
              ev.preventDefault();
              ev.target.form && ev.target.form.reset();
              onLocationChange({ district: "", upazila: "" });
            }}
          >
            Reset
          </button>
        </div>
      )}
    </form>
  );
}
