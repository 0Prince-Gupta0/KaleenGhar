import React from "react";

const Contact = () => {
  return (
    <div className="bg-[#FBF7F1] text-[#2E2E2E]">

      {/* HERO SECTION */}
      <section className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] flex items-center justify-center text-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1600166898405-da9535204843"
          alt="Carpet Background"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative z-10 px-4 sm:px-6 max-w-3xl">

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Contact
          </h1>

          <h2
            className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.2em] sm:tracking-[0.3em]"
            style={{ color: "#C49A3A" }}
          >
            QALEEN GHAR
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-200">
            We’re here to help with any questions about our carpets, orders, or services.
          </p>

        </div>
      </section>

      {/* CONTACT POLICY */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Contact <span className="text-[#C49A3A]">Policy</span>
            </h2>

            <div className="w-20 sm:w-24 h-[2px] bg-[#C49A3A] mx-auto mt-3 sm:mt-4"></div>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              We provide prompt and helpful support for all inquiries related to our products and services.
            </p>
          </div>

          {/* CONTACT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

            {/* EMAIL */}
            <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition border hover:border-[#C49A3A]/40 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 flex items-center justify-center rounded-full bg-[#F3EDE4] text-[#C49A3A] text-xl sm:text-2xl group-hover:bg-[#C49A3A] group-hover:text-white transition">
                ✉
              </div>

              <h4 className="font-semibold text-base sm:text-lg mb-2">Email</h4>

              <a href="mailto:qaleengharr@gmail.com" className="text-sm sm:text-base text-gray-600 hover:text-[#C49A3A]">
                qaleengharr@gmail.com
              </a>
            </div>

            {/* PHONE */}
            <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition border hover:border-[#C49A3A]/40 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 flex items-center justify-center rounded-full bg-[#F3EDE4] text-[#C49A3A] text-xl sm:text-2xl group-hover:bg-[#C49A3A] group-hover:text-white transition">
                ☎
              </div>

              <h4 className="font-semibold text-base sm:text-lg mb-2">Phone / WhatsApp</h4>

              <div className="text-sm sm:text-base text-gray-600 space-y-1">
                <a href="tel:+919810868799" className="block hover:text-[#C49A3A]">
                  +91 9810868799
                </a>
                <a href="tel:+919810875599" className="block hover:text-[#C49A3A]">
                  +91 9810875599
                </a>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition border hover:border-[#C49A3A]/40 text-center sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 flex items-center justify-center rounded-full bg-[#F3EDE4] text-[#C49A3A] text-xl sm:text-2xl group-hover:bg-[#C49A3A] group-hover:text-white transition">
                📍
              </div>

              <h4 className="font-semibold text-base sm:text-lg mb-2">Address</h4>

              <a
                href="https://maps.app.goo.gl/QfPKM6EijUKsk2s97"
                target="_blank"
                rel="noreferrer"
                className="text-sm sm:text-base text-gray-600 hover:text-[#C49A3A]"
              >
                J-152, Sector-41 <br />
                Noida, Uttar Pradesh 201303
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F3EDE4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Customer <span className="text-[#C49A3A]">Support</span>
            </h2>
            <div className="w-20 sm:w-24 h-[2px] bg-[#C49A3A] mx-auto mt-3 sm:mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">

            {/* CARD */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center">
              <div className="text-[#C49A3A] text-2xl sm:text-3xl mb-3 sm:mb-4">⏱</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Response Time</h3>
              <p className="text-sm sm:text-base text-gray-600">
                24–48 business hours
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center">
              <div className="text-[#C49A3A] text-2xl sm:text-3xl mb-3 sm:mb-4">🕘</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Business Hours</h3>
              <p className="text-sm sm:text-base text-gray-600">
                10:00 AM – 9:00 PM
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition text-center sm:col-span-2 md:col-span-1">
              <div className="text-[#C49A3A] text-2xl sm:text-3xl mb-3 sm:mb-4">📦</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Order Queries</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Product, shipping & bulk orders
              </p>
            </div>

          </div>

          {/* FEEDBACK */}
          <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto">

            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              Feedback & Suggestions
            </h3>

            <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
              Share your feedback anytime.
            </p>

            <a
              href="mailto:qaleengharr@gmail.com?subject=Customer Feedback - QaleenGhar"
              className="inline-block w-full sm:w-auto px-6 py-3 rounded-full bg-[#C49A3A] text-white font-medium shadow-md hover:bg-[#b58d33] hover:shadow-lg transition"
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