import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const MyDonationRequests = () => {
  const { user, serverApi } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ Fetch all requests of logged-in user
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["allRequests", user?.email],
    queryFn: async () => {
      const res = await fetch(`${serverApi}/api/requests?email=${user?.email}`);
      if (!res.ok) throw new Error("Failed to fetch donation requests");
      return res.json();
    },
    enabled: !!user?.email,
  });

  // ✅ Update status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await fetch(`${serverApi}/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allRequests", user?.email]);
    },
  });

  // ✅ Delete request
  const deleteRequestMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${serverApi}/api/requests/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete request");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allRequests", user?.email]);
    },
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading requests...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">
        My Donation Requests 🩸
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t made any donation requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-red-600 text-white">
              <tr>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Donor Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border">
                  <td>{req.recipientName}</td>
                  <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>{req.bloodGroup}</td>
                  <td className="capitalize">{req.status}</td>
                  <td>
                    {req.status === "inprogress" ? (
                      <div>
                        <p>{req.donorName}</p>
                        <p>{req.donorEmail}</p>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="space-x-2">
                    {/* ✅ Edit */}
                    <Link
                      to={`/edit-request/${req._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </Link>

                    {/* ✅ Delete */}
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => {
                        if (window.confirm("Are you sure to delete this request?")) {
                          deleteRequestMutation.mutate(req._id);
                        }
                      }}
                    >
                      Delete
                    </button>

                    {/* ✅ View */}
                    <Link
                      to={`/request/${req._id}`}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </Link>

                    {/* ✅ Status Update */}
                    {req.status === "inprogress" && (
                      <>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            updateStatusMutation.mutate({ id: req._id, status: "done" })
                          }
                        >
                          Done
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() =>
                            updateStatusMutation.mutate({ id: req._id, status: "canceled" })
                          }
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
