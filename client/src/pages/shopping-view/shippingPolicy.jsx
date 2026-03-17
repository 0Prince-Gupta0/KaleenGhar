import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="bg-[#FBF7F1] text-[#2E2E2E] min-h-screen">

      {/* HERO */}
      <section className="relative h-[45vh] flex items-center justify-center text-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1600166898405-da9535204843"
          alt="Carpet Background"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-white">
            Shipping Policy
          </h1>
<h2
              className="mt-3 text-4xl md:text-5xl font-bold tracking-[0.35em]"
              style={{ color: "#C49A3A" }}
            >
              QALEEN GHAR
            </h2>
          <p className="mt-6 text-gray-200">
            Last Updated: March 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-14">

          {/* Intro */}
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold text-[#C49A3A]">QaleenGhar</span>,
            we are committed to delivering high-quality carpets safely and
            efficiently to our customers.
          </p>

          {/* Order Processing */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Order Processing
            </h2>

            <p className="text-gray-700 leading-relaxed">
              All orders are processed within{" "}
              <span className="font-semibold text-[#C49A3A]">
                1–3 business days
              </span>{" "}
              after confirmation. Orders are shipped from our location in{" "}
              <strong>
                Sector-41, Noida, Uttar Pradesh, India
              </strong>.
            </p>

            <p className="mt-4 text-gray-700">
              Custom or made-to-order carpets may require additional time
              depending on design and production requirements.
            </p>
          </div>

          {/* Shipping Time */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Shipping Time
            </h2>

            <ul className="space-y-2 text-gray-700">
              <li>
                • Within India:{" "}
                <span className="font-semibold">5–10 business days</span>
              </li>
              <li>
                • International:{" "}
                <span className="font-semibold">
                  7–20 business days
                </span>
              </li>
            </ul>

            <p className="mt-4 text-gray-700">
              Delivery times are estimates and may vary due to courier delays
              or unforeseen circumstances.
            </p>
          </div>

          {/* Shipping Charges */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Shipping Charges
            </h2>

            <p className="text-gray-700">
              Shipping charges (if applicable) will be displayed at checkout.
              Occasionally, we may offer free shipping promotions which will be
              clearly mentioned on the website.
            </p>
          </div>

          {/* Tracking */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Order Tracking
            </h2>

            <p className="text-gray-700">
              Once your order is shipped, you will receive a tracking number via
              email or SMS to track your delivery.
            </p>
          </div>

          {/* Delivery Issues */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Delivery Issues
            </h2>

            <p className="text-gray-700">
              If your package is delayed, lost, or damaged, please contact our
              support team immediately at{" "}
              <span className="text-[#C49A3A] font-medium">
                qaleengharr@gmail.com
              </span>.
            </p>
          </div>

          {/* International */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              International Shipping
            </h2>

            <p className="text-gray-700">
              International customers may be responsible for customs duties,
              taxes, or import charges imposed by their country. These are not
              included in product or shipping costs.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-[#F3EDE4] p-8 rounded-lg text-center">

            <h2 className="text-2xl font-semibold mb-4">
              Need Help?
            </h2>

            <p className="text-gray-700 mb-6">
              For any shipping-related queries, feel free to contact our support team.
            </p>

            <a
              href="mailto:qaleengharr@gmail.com"
              className="inline-block px-6 py-3 rounded-full bg-[#C49A3A] text-white font-medium hover:bg-[#b58d33] transition"
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