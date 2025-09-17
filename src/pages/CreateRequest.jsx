import { useState } from "react";
import Swal from "sweetalert2";
import DonationRequestForm from "../components/DonationRequestForm";

export default function CreateRequest() {
  const [location, setLocation] = useState({ district: "", upazila: "" });

  const handleSubmit = async (payload, form) => {
    // API call to create
    console.log("Creating:", payload);
    Swal.fire("Success", "Blood request submitted", "success");
    form.reset();
    setLocation({ district: "", upazila: "" });
  };

  return (
    <DonationRequestForm
      mode="create"
      location={location}
      onLocationChange={setLocation}
      onSubmit={handleSubmit}
    />
  );
}
