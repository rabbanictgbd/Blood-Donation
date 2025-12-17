import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const ContactUs = () => {
  const { serverApi } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch(`${serverApi}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("✅ Your message has been sent!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSuccess("❌ Failed to send: " + data.error);
      }
    } catch (err) {
      setSuccess("❌ Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
          📞 Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Info */}
          <div className="space-y-6">
            <p className="text-lg text-gray-600">
              Have questions or need assistance? Reach out to us through this form
              or via the details below.
            </p>
            <p>
              <strong>📍 Address:</strong>{" "}
              <a
                href="https://www.google.com/maps/place/2+Hiru+Miah+Road,+Dhaka+1214/@23.7272045,90.4374206,21z/data=!4m6!3m5!1s0x3755b83a74672ff7:0x907360d8b27d11bf!8m2!3d23.7272596!4d90.4374116!16s%2Fg%2F11gf1rj3n3?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                // href="https://www.google.com/maps/search/?api=1&query=South+Manda+Mugda+Dhaka+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                South Manda, Mugda, Dhaka, Bangladesh
              </a>
            </p>

            <p>
              <strong>📧 Email:</strong>{" "}
              <a
                href="mailto:rabbanictgbd@gmail.com"
                className="text-blue-600 hover:underline"
              >
                rabbanictgbd@gmail.com
              </a>
            </p>

            <p>
              <strong>📞 Phone:</strong>{" "}
              <a
                href="tel:+8801832786121"
                className="text-blue-600 hover:underline"
              >
                +880 1832-786121
              </a>
            </p>

          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="card bg-white shadow-lg p-6 space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="textarea textarea-bordered w-full"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-error text-white w-full"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {success && <p className="text-center text-green-600">{success}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
