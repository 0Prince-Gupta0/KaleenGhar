import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
            Privacy Policies
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

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            At <span className="font-semibold text-[#C49A3A]">QaleenGhar</span>,
            accessible from <strong>www.qaleenghar.com</strong>, protecting your
            privacy is our priority. This policy explains how we collect, use,
            and safeguard your information.
          </p>

          {/* SECTION BLOCK */}
          {[
            {
              title: "Information We Collect",
              content: (
                <>
                  <ul className="space-y-2">
                    <li>• Name</li>
                    <li>• Email address</li>
                    <li>• Phone number</li>
                    <li>• Shipping address</li>
                    <li>• Payment details (secure third-party processing)</li>
                  </ul>
                  <p className="mt-4">
                    Collected during orders, contact, or account creation.
                  </p>
                </>
              )
            },
            {
              title: "How We Use Your Information",
              content: (
                <ul className="space-y-2">
                  <li>• Process and deliver orders</li>
                  <li>• Customer communication</li>
                  <li>• Improve services</li>
                  <li>• Customer support</li>
                  <li>• Promotions (if subscribed)</li>
                </ul>
              )
            },
            {
              title: "Data Protection",
              content:
                "We use strong security measures. Payments are securely handled by trusted providers."
            },
            {
              title: "Cookies",
              content:
                "Cookies help improve user experience and analyze traffic. You can disable them in browser settings."
            },
            {
              title: "Third-Party Services",
              content:
                "We use trusted services like payment gateways and analytics tools that only process necessary data."
            },
            {
              title: "Your Rights",
              content: (
                <>
                  <ul className="space-y-2">
                    <li>• Access your data</li>
                    <li>• Request corrections or deletion</li>
                    <li>• Opt out of marketing</li>
                  </ul>
                  <p className="mt-4">
                    Contact us at{" "}
                    <span className="text-[#C49A3A] font-medium">
                      qaleengharr@gmail.com
                    </span>
                  </p>
                </>
              )
            },
            {
              title: "Changes to This Policy",
              content:
                "We may update this policy occasionally. Updates will appear on this page."
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

          {/* CONTACT */}
          <div className="bg-[#F3EDE4] p-6 sm:p-8 rounded-lg text-center">

            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              Contact Us
            </h2>

            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Have questions? Reach out to our support team anytime.
            </p>

            <Link
              to="/contact"
              className="inline-block w-full sm:w-auto px-6 py-3 rounded-full bg-[#C49A3A] text-white font-medium shadow-md hover:bg-[#b58d33] hover:shadow-lg transition"
            >
              Contact Support
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
};

export default PrivacyPolicy;