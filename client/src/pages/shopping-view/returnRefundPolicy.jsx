import React from "react";

const ReturnRefundPolicy = () => {
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
            Return & Refund Policy
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
            customer satisfaction is our priority. If you are not completely satisfied,
            we offer a return and refund process under the following conditions.
          </p>

          {/* Reusable Section */}
          {[
            {
              title: "Return Eligibility",
              content: (
                <>
                  <p className="mb-4">
                    Returns are accepted within{" "}
                    <span className="font-semibold text-[#C49A3A]">7 days</span> if:
                  </p>
                  <ul className="space-y-2">
                    <li>• Damaged during shipping</li>
                    <li>• Wrong product delivered</li>
                    <li>• Manufacturing defect</li>
                  </ul>
                  <p className="mt-4">
                    Product must be unused and in original packaging.
                  </p>
                </>
              )
            },
            {
              title: "Non-Returnable Items",
              content: (
                <ul className="space-y-2">
                  <li>• Custom-made carpets</li>
                  <li>• Misused or damaged products</li>
                  <li>• Late return requests</li>
                </ul>
              )
            },
            {
              title: "Return Process",
              content: (
                <>
                  <p className="mb-4">Provide:</p>
                  <ul className="space-y-2">
                    <li>• Order number</li>
                    <li>• Product photos</li>
                    <li>• Reason for return</li>
                  </ul>
                  <p className="mt-4">
                    Email:{" "}
                    <span className="text-[#C49A3A] font-medium">
                      qaleengharr@gmail.com
                    </span>
                  </p>
                </>
              )
            },
            {
              title: "Refund Process",
              content: (
                <>
                  <p>
                    Refund is processed after inspection and approval.
                  </p>
                  <p className="mt-4">
                    Timeline:{" "}
                    <span className="font-semibold text-[#C49A3A]">
                      5–10 business days
                    </span>
                  </p>
                </>
              )
            },
            {
              title: "Shipping Costs",
              content:
                "We cover shipping for damaged/incorrect items. Otherwise, customer pays return shipping."
            },
            {
              title: "Order Cancellation",
              content:
                "Orders can be cancelled within 24 hours. Once shipped, cancellation is not possible."
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
              Need Assistance?
            </h2>

            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              For any return or refund queries, contact our support team.
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

export default ReturnRefundPolicy;