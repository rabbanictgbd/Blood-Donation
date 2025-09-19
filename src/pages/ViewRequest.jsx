import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DonationRequestForm from "../components/DonationRequestForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function ViewRequest() {
  const { id } = useParams(); // URL param /view-request/:id
  const { serverApi } = useContext(AuthContext);

  // ✅ Fetch single request from API
  const { data: request, isLoading, error } = useQuery({
    queryKey: ["request", id],
    queryFn: async () => {
      const res = await fetch(`${serverApi}/api/requests/${id}`);
      if (!res.ok) throw new Error("Failed to fetch request");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading request</p>;

  return (
    <DonationRequestForm
      mode="view"
      request={request}
      location={{ district: request?.district, upazila: request?.upazila }}
      onLocationChange={() => {}}
    />
  );
}
