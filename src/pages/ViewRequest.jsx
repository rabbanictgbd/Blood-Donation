import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DonationRequestForm from "../components/DonationRequestForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

export default function ViewRequest() {
  const { id } = useParams(); // URL param /view-request/:id
  const { serverApi, user } = useContext(AuthContext);
  const queryClient = useQueryClient();

    const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null; // avoid fetch if no user
      const res = await fetch(`${serverApi}/api/users/${user.email}`);
      if (!res.ok) throw new Error("Failed to fetch user profile");
      return res.json();
    },
    enabled: !!user?.email, // only run if email exists
  });

  // ✅ Fetch single request from API
  const { data: request, isLoading, error } = useQuery({
    queryKey: ["request", id],
    queryFn: async () => {
      const res = await fetch(`${serverApi}/api/requests/${id}`);
      if (!res.ok) throw new Error("Failed to fetch request");
      return res.json();
    },
  });

  // ✅ Mutation: update request status
  const updateStatusMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${serverApi}/api/requests/${id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "inprogress",
          donorName: profile?.name,
          donorEmail: user?.email,
        }),
      });
      if (!res.ok) throw new Error("Failed to update request status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["request", id]); // refetch updated request
      Swal.fire("Success!", "You are now assigned as donor.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update status.", "error");
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading request</p>;

  return (
    <div>
      <DonationRequestForm
        mode="view"
        request={request}
        location={{ district: request?.district, upazila: request?.upazila }}
        onLocationChange={() => {}}
      />
      <br />
      <button
        className="btn btn-accent"
        type="button"
        onClick={() => updateStatusMutation.mutate()}
        disabled={request?.status !== "pending"} // disable if not pending
      >
        Donate
      </button>
    </div>
  );
}
