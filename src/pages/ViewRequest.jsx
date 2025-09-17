import DonationRequestForm from "../components/DonationRequestForm";

export default function ViewRequest({ request }) {
  return (
    <DonationRequestForm
      mode="view"
      request={request}
      location={{ district: request.district, upazila: request.upazila }}
      onLocationChange={() => {}}
    />
  );
}
