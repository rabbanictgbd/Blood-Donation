import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold text-red-600">
              Welcome to Blood Donation App 🩸
            </h1>
            <p className="py-6 text-gray-600">
              Your contribution can save lives. Join as a donor or search for donors near you.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register" className="btn btn-error text-white">
                Join as Donor
              </Link>
              <Link to="/search" className="btn btn-outline btn-error">
                Search Donors
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder Sections */}
      <section className="py-10 px-5 text-center">
        <h2 className="text-2xl font-semibold mb-4">🌟 Featured Section</h2>
        <p className="text-gray-500">Content coming soon...</p>
      </section>

      <section className="py-10 px-5 text-center bg-base-100">
        <h2 className="text-2xl font-semibold mb-4">📞 Contact Us</h2>
        <p className="text-gray-500">Contact details will appear here...</p>
      </section>
    </div>
  );
}
