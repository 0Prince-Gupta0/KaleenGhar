import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="bg-[#FBF7F1] text-[#2E2E2E] min-h-screen">

      {/* HERO */}
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] flex items-center justify-center text-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1600166898405-da9535204843"
          alt="Carpet Background"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-4 sm:px-6 max-w-3xl">

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Shipping Policy
          </h1>

          <h2
            className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.2em] sm:tracking-[0.3em]"
            style={{ color: "#C49A3A" }}
          >
            QALEEN GHAR
          </h2>

          <p className="mt-3 sm:mt-5 text-xs sm:text-sm md:text-base text-gray-200">
            Last Updated: March 2026
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-14">

          {/* Intro */}
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            At <span className="font-semibold text-[#C49A3A]">QaleenGhar</span>,
            we ensure safe and timely delivery of our carpets to customers worldwide.
          </p>

          {/* Sections */}
          {[
            {
              title: "Order Processing",
              content: (
                <>
                  <p>
                    Orders are processed within{" "}
                    <span className="font-semibold text-[#C49A3A]">
                      1–3 business days
                    </span>.
                  </p>
                  <p className="mt-4">
                    Shipped from <strong>Noida, Uttar Pradesh, India</strong>.
                  </p>
                  <p className="mt-4">
                    Custom carpets may require additional production time.
                  </p>
                </>
              )
            },
            {
              title: "Shipping Time",
              content: (
                <>
                  <ul className="space-y-2">
                    <li>• India: <span className="font-semibold">5–10 days</span></li>
                    <li>• International: <span className="font-semibold">7–20 days</span></li>
                  </ul>
                  <p className="mt-4">
                    Delivery times may vary due to logistics delays.
                  </p>
                </>
              )
            },
            {
              title: "Shipping Charges",
              content:
                "Shipping charges (if any) are shown at checkout. Free shipping offers may be available."
            },
            {
              title: "Order Tracking",
              content:
                "Tracking details will be shared via email or SMS after dispatch."
            },
            {
              title: "Delivery Issues",
              content: (
                <>
                  <p>
                    For delays, damage, or lost shipments, contact:
                  </p>
                  <p className="mt-3 text-[#C49A3A] font-medium">
                    qaleengharr@gmail.com
                  </p>
                </>
              )
            },
            {
              title: "International Shipping",
              content:
                "Custom duties, taxes, or import charges (if applicable) must be paid by the customer."
            }
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
                {section.title}
              </h2>
              <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="bg-[#F3EDE4] p-6 sm:p-8 rounded-lg text-center">

            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              Need Help?
            </h2>

            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Contact us for any shipping-related queries.
            </p>

            <a
              href="mailto:qaleengharr@gmail.com"
              className="inline-block w-full sm:w-auto px-6 py-3 rounded-full bg-[#C49A3A] text-white font-medium hover:bg-[#b58d33] transition"
            >
              Contact Support
            </a>

          </div>

        </div>
      </section>

    </div>
  );
};

export default ShippingPolicy;