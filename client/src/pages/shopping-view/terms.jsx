import React from "react";

const Terms = () => {
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
            Terms & Conditions
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
            Welcome to{" "}
            <span className="font-semibold text-[#C49A3A]">QaleenGhar</span>.
            By using our website <strong>www.qaleenghar.com</strong>, you agree
            to these Terms and Conditions.
          </p>

          {/* Sections */}
          {[
            {
              title: "Use of the Website",
              content:
                "You must be at least 18 years old or supervised. Use the website only for lawful purposes."
            },
            {
              title: "Products and Services",
              content:
                "We offer handcrafted carpets. Minor variations may occur due to the handmade nature."
            },
            {
              title: "Pricing and Payments",
              content: (
                <ul className="space-y-2">
                  <li>• Prices in INR (unless specified)</li>
                  <li>• Subject to change</li>
                  <li>• Secure third-party payment processing</li>
                </ul>
              )
            },
            {
              title: "Orders and Acceptance",
              content:
                "Orders may be cancelled due to availability, pricing errors, or suspected fraud."
            },
            {
              title: "Shipping and Delivery",
              content:
                "Delivery times may vary. We are not responsible for courier delays."
            },
            {
              title: "Returns and Refunds",
              content:
                "Refer to our Return & Refund Policy for complete details."
            },
            {
              title: "Intellectual Property",
              content:
                "All content is owned by QaleenGhar and protected by law. Unauthorized use is prohibited."
            },
            {
              title: "Limitation of Liability",
              content:
                "We are not liable for damages from website or product usage."
            },
            {
              title: "External Links",
              content:
                "We are not responsible for third-party website content or policies."
            },
            {
              title: "Changes to Terms",
              content:
                "We may update terms anytime. Continued use implies acceptance."
            },
            {
              title: "Governing Law",
              content:
                "These terms are governed by Indian law. Jurisdiction: Uttar Pradesh."
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
              Contact Us
            </h2>

            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Have questions about these terms? Reach out anytime.
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

export default Terms;