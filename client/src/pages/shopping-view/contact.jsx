
import React from "react";

const Contact = () => {
  return (
      <div className="bg-[#FBF7F1] text-[#2E2E2E]">

        {/* HERO SECTION */}
        <section className="relative h-[55vh] flex items-center justify-center text-center overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1600166898405-da9535204843"
            alt="Carpet Background"
            className="absolute w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55"></div>

          <div className="relative z-10 px-6">

            <h1 className="text-4xl md:text-5xl font-semibold text-white">
              Contact
            </h1>

            <h2
              className="mt-3 text-4xl md:text-5xl font-bold tracking-[0.35em]"
              style={{ color: "#C49A3A" }}
            >
              QALEEN GHAR
            </h2>

            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
              We’re here to help with any questions about our carpets, orders, or services.
            </p>

          </div>
        </section>

        {/* CONTACT POLICY */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">

            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Contact <span className="text-[#C49A3A]">Policy</span>
              </h2>

              <div className="w-24 h-[2px] bg-[#C49A3A] mx-auto mt-4"></div>

              <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
                At QaleenGhar, we value our customers and strive to provide prompt
                and helpful support for all inquiries related to our products and services.
              </p>
            </div>

            {/* CONTACT CARDS */}
       <div className="grid md:grid-cols-3 gap-8">

  {/* EMAIL */}
  <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-transparent hover:border-[#C49A3A]/40 text-center">

    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#F3EDE4] text-[#C49A3A] text-2xl group-hover:bg-[#C49A3A] group-hover:text-white transition">
      ✉
    </div>

    <h4 className="font-semibold text-lg mb-2">Email</h4>

    <a
      href="mailto:qaleengharr@gmail.com"
      className="text-gray-600 hover:text-[#C49A3A] transition"
    >
      qaleengharr@gmail.com
    </a>

  </div>

  {/* PHONE */}
  <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-transparent hover:border-[#C49A3A]/40 text-center">

    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#F3EDE4] text-[#C49A3A] text-2xl group-hover:bg-[#C49A3A] group-hover:text-white transition">
      ☎
    </div>

    <h4 className="font-semibold text-lg mb-2">Phone / WhatsApp</h4>

    <div className="text-gray-600 space-y-1">
      <a href="tel:+919810868799" className="block hover:text-[#C49A3A]">
        +91 9810868799
      </a>
      <a href="tel:+919810875599" className="block hover:text-[#C49A3A]">
        +91 9810875599
      </a>
    </div>

  </div>

  {/* ADDRESS */}
  <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-transparent hover:border-[#C49A3A]/40 text-center">

    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#F3EDE4] text-[#C49A3A] text-2xl group-hover:bg-[#C49A3A] group-hover:text-white transition">
      📍
    </div>

    <h4 className="font-semibold text-lg mb-2">Address</h4>

    <a
      href="https://maps.app.goo.gl/QfPKM6EijUKsk2s97"
      target="_blank"
      rel="noreferrer"
      className="text-gray-600 hover:text-[#C49A3A]"
    >
      J-152, Sector-41 <br />
      Noida, Uttar Pradesh 201303
    </a>

  </div>

</div>

          </div>
        </section>

        {/* RESPONSE TIME & BUSINESS HOURS */}
       {/* SUPPORT INFORMATION */}
<section className="py-24 bg-[#F3EDE4]">

  <div className="max-w-6xl mx-auto px-6">

    {/* Title */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-semibold">
        Customer <span className="text-[#C49A3A]">Support</span>
      </h2>
      <div className="w-24 h-[2px] bg-[#C49A3A] mx-auto mt-4"></div>
    </div>

    <div className="grid md:grid-cols-3 gap-10">

      {/* RESPONSE TIME */}
      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition text-center">

        <div className="text-[#C49A3A] text-3xl mb-4">⏱</div>

        <h3 className="text-xl font-semibold mb-3">
          Response Time
        </h3>

        <p className="text-gray-600">
          We respond to inquiries within
          <span className="font-semibold text-[#C49A3A]">
            {" "}24–48 business hours
          </span>.
        </p>

      </div>

      {/* BUSINESS HOURS */}
      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition text-center">

        <div className="text-[#C49A3A] text-3xl mb-4">🕘</div>

        <h3 className="text-xl font-semibold mb-3">
          Business Hours
        </h3>

        <p className="text-gray-600">
          Monday – Sunday <br />
          <span className="font-semibold">
            10:00 AM – 9:00 PM (IST)
          </span>
        </p>

      </div>

      {/* ORDER QUERIES */}
      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition text-center">

        <div className="text-[#C49A3A] text-3xl mb-4">📦</div>

        <h3 className="text-xl font-semibold mb-3">
          Order & Product Queries
        </h3>

        <ul className="space-y-1 text-gray-600 text-sm">
          <li>✓ Product details</li>
          <li>✓ Custom carpet orders</li>
          <li>✓ Shipping & delivery</li>
          <li>✓ Bulk or wholesale inquiries</li>
        </ul>

      </div>

    </div>

    {/* FEEDBACK */}
   <div className="mt-16 text-center max-w-3xl mx-auto">

  <h3 className="text-2xl font-semibold mb-4">
    Feedback & Suggestions
  </h3>

  <p className="text-gray-600 mb-6">
    We welcome customer feedback to help improve our services and product
    offerings. If you have suggestions or concerns, feel free to reach out
    to us anytime.
  </p>

  <a
    href="mailto:qaleengharr@gmail.com?subject=Customer Feedback - QaleenGhar"
    className="inline-block px-6 py-3 rounded-full bg-[#C49A3A] text-white font-medium shadow-md hover:bg-[#b58d33] hover:shadow-lg transition"
  >
    Send Feedback
  </a>

</div>

  </div>

</section>

      </div>
  );
};

export default Contact;