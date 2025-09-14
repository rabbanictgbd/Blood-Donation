import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const {user, serverApi}= useContext(AuthContext)
    // ✅ Fetch current user from backend
  const { data: profile } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await fetch(`${serverApi}/api/users/${user?.email}`);
      if (!res.ok) throw new Error("Failed to fetch user profile");
      return res.json();
    },
  });
  return (
    
    <div className="text-center text-3xl text-red-600 font-bold mt-10">
      Hi {profile?.name},
      Welcome to Dashboard Donation App 🩸
    </div>
  )
}

export default Dashboard
