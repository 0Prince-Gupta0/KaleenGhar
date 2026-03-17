import React from "react";

const Terms = () => {
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
            Terms & Conditions
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
            Welcome to{" "}
            <span className="font-semibold text-[#C49A3A]">QaleenGhar</span>.
            By accessing or using our website{" "}
            <strong>www.qaleenghar.com</strong>, you agree to comply with and be
            bound by the following Terms and Conditions.
          </p>

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Use of the Website
            </h2>

            <p className="text-gray-700">
              You confirm that you are at least 18 years old or using the website
              under the supervision of a parent or guardian. You agree to use
              this website only for lawful purposes.
            </p>
          </div>

          {/* Products */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Products and Services
            </h2>

            <p className="text-gray-700">
              QaleenGhar specializes in manufacturing high-quality carpets,
              including hand-tufted carpets. Product descriptions, images, and
              prices are accurate to the best of our knowledge, but slight
              variations may occur due to handcrafted processes.
            </p>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Pricing and Payments
            </h2>

            <ul className="space-y-2 text-gray-700">
              <li>• Prices are listed in INR unless stated otherwise</li>
              <li>• Prices may change without prior notice</li>
              <li>• Payments are processed securely via third-party providers</li>
            </ul>
          </div>

          {/* Orders */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Orders and Acceptance
            </h2>

            <p className="text-gray-700">
              Order confirmation does not guarantee acceptance. QaleenGhar
              reserves the right to cancel or refuse any order due to
              availability, pricing errors, or suspected fraud.
            </p>
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Shipping and Delivery
            </h2>

            <p className="text-gray-700">
              We aim to process and ship orders promptly. Delivery times may vary
              based on location and availability. We are not responsible for
              delays caused by couriers or unforeseen circumstances.
            </p>
          </div>

          {/* Returns */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Returns and Refunds
            </h2>

            <p className="text-gray-700">
              Returns and refunds are subject to our Return & Refund Policy.
              Please review it before making a purchase.
            </p>
          </div>

          {/* IP */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Intellectual Property
            </h2>

            <p className="text-gray-700">
              All website content including logos, images, and designs are the
              property of QaleenGhar and protected by intellectual property
              laws. Unauthorized use is prohibited.
            </p>
          </div>

          {/* Liability */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Limitation of Liability
            </h2>

            <p className="text-gray-700">
              QaleenGhar will not be liable for any damages resulting from the
              use or inability to use our website or products.
            </p>
          </div>

          {/* External */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              External Links
            </h2>

            <p className="text-gray-700">
              Our website may contain links to third-party sites. We are not
              responsible for their content or policies.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Changes to Terms
            </h2>

            <p className="text-gray-700">
              We may update these Terms at any time. Changes will be effective
              once posted. Users are encouraged to review periodically.
            </p>
          </div>

          {/* Law */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Governing Law
            </h2>

            <p className="text-gray-700">
              These Terms are governed by the laws of India. Any disputes shall
              fall under the jurisdiction of courts in Uttar Pradesh.
            </p>
          </div>

          {/* CONTACT CTA */}
          <div className="bg-[#F3EDE4] p-8 rounded-lg text-center">

            <h2 className="text-2xl font-semibold mb-4">
              Contact Us
            </h2>

            <p className="text-gray-700 mb-6">
              If you have any questions regarding these Terms & Conditions,
              feel free to contact us.
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

export default Terms;