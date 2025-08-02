import { Link } from "react-router-dom";

export default function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login submitted (backend coming soon)");
  };

  return (
    <div className="max-w-md mx-auto bg-base-100 shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
        Login 🩸
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />

        {/* Submit Button */}
        <button type="submit" className="btn btn-error w-full text-white">
          Login
        </button>
      </form>

      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-red-500 font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
}
