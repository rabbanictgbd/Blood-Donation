import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, serverApi } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ Fetch donor profile
  const { data: profile } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await fetch(`${serverApi}/api/users/${user?.email}`);
      if (!res.ok) throw new Error("Failed to fetch user profile");
      return res.json();
    },
    enabled: !!user?.email,
  });

  // ✅ Fetch 3 recent requests
  const { data: requests = [] } = useQuery({
    queryKey: ["recentRequests", user?.email],
    queryFn: async () => {
      const res = await fetch(`${serverApi}/api/requests?email=${user?.email}&limit=3`);
      if (!res.ok) throw new Error("Failed to fetch donation requests");
      return res.json();
    },
    enabled: !!user?.email,
  });

  // ✅ Update status mutation
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
      queryClient.invalidateQueries(["recentRequests", user?.email]);
    },
  });

  // ✅ Delete request mutation
  const deleteRequestMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${serverApi}/api/requests/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete request");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recentRequests", user?.email]);
    },
  });

  return (
    <div className="p-5">
      {/* ✅ Greeting */}
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        Hi {profile?.name}, Welcome to Your Blood Donation Dashboard🩸
      </h1>

      {/* ✅ Show requests if available */}
      {requests.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Recent Donation Requests</h2>
          <div className="overflow-x-auto">
            <table className="table w-full border">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th>Recipient Name</th>
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
                    <td>{req.district}, {req.upazila}</td>
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

          {/* ✅ View All Button */}
          <div className="text-center mt-6">
            <Link to="/my-donation-requests" className="btn btn-primary">
              View My All Requests
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
