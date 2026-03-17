import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
            Privacy Policies
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

          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold text-[#C49A3A]">QaleenGhar</span>,
            accessible from <strong>www.qaleenghar.com</strong>, protecting the
            privacy of our visitors and customers is one of our main priorities.
            This Privacy Policy explains how we collect, use, and safeguard your
            information.
          </p>

          {/* Information We Collect */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>

            <ul className="space-y-2 text-gray-700">
              <li>• Name</li>
              <li>• Email address</li>
              <li>• Phone number</li>
              <li>• Shipping address</li>
              <li>• Payment details (processed securely through payment providers)</li>
            </ul>

            <p className="mt-4 text-gray-700">
              This information is collected when you place an order, contact us,
              subscribe to our newsletter, or create an account on our website.
            </p>
          </div>

          {/* How We Use */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Your Information
            </h2>

            <ul className="space-y-2 text-gray-700">
              <li>• Process and deliver orders</li>
              <li>• Communicate with customers regarding purchases</li>
              <li>• Improve our website and services</li>
              <li>• Provide customer support</li>
              <li>• Send order updates and promotional offers (if subscribed)</li>
            </ul>
          </div>

          {/* Data Protection */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Data Protection
            </h2>

            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your
              personal information from unauthorized access, misuse, or
              disclosure. Your payment information is handled securely by
              trusted third-party payment providers and is not stored directly
              on our servers.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Cookies
            </h2>

            <p className="text-gray-700 leading-relaxed">
              Our website may use cookies to improve your browsing experience
              and analyze website traffic. Cookies help us understand how users
              interact with our website so we can enhance functionality.
              You can disable cookies in your browser settings if you prefer.
            </p>
          </div>

          {/* Third Party */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Third-Party Services
            </h2>

            <p className="text-gray-700 leading-relaxed">
              We may use trusted third-party services such as payment gateways,
              analytics tools, and shipping providers. These services may
              collect information necessary to perform their functions but are
              not permitted to use it for other purposes.
            </p>
          </div>

          {/* Rights */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Your Rights
            </h2>

            <ul className="space-y-2 text-gray-700">
              <li>• Request access to your personal data</li>
              <li>• Request correction or deletion of your data</li>
              <li>• Opt out of marketing communications</li>
            </ul>

            <p className="mt-4 text-gray-700">
              To make such requests, please contact us at
              <span className="text-[#C49A3A] font-medium">
                {" "}qaleengharr@gmail.com
              </span>
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Changes to This Policy
            </h2>

            <p className="text-gray-700">
              QaleenGhar may update this Privacy Policy from time to time.
              Any changes will be posted on this page.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-[#F3EDE4] p-8 rounded-lg text-center">

  <h2 className="text-2xl font-semibold mb-4">
    Contact Us
  </h2>

  <p className="text-gray-700 mb-6">
    If you have any questions about this Privacy Policy or our services,
    feel free to reach out to our support team.
  </p>

  <Link
    to="/contact"
    className="inline-block px-6 py-3 rounded-full bg-[#C49A3A] text-white font-medium shadow-md hover:bg-[#b58d33] hover:shadow-lg transition"
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