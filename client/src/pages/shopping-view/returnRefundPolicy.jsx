import React from "react";

const ReturnRefundPolicy = () => {
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
            Return & Refund Policy
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
            customer satisfaction is our priority. If you are not completely
            satisfied with your purchase, we offer a return and refund process
            under the following conditions.
          </p>

          {/* Return Eligibility */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Return Eligibility
            </h2>

            <p className="text-gray-700 mb-4">
              You may request a return within{" "}
              <span className="font-semibold text-[#C49A3A]">
                7 days
              </span>{" "}
              of receiving your order if:
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>• The product is damaged during shipping</li>
              <li>• The wrong product was delivered</li>
              <li>• The product has a manufacturing defect</li>
            </ul>

            <p className="mt-4 text-gray-700">
              The product must be unused and returned in its original condition
              and packaging.
            </p>
          </div>

          {/* Non Returnable */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Non-Returnable Items
            </h2>

            <ul className="space-y-2 text-gray-700">
              <li>• Custom-made or personalized carpets</li>
              <li>• Products damaged due to misuse or improper care</li>
              <li>• Items returned after the allowed return period</li>
            </ul>
          </div>

          {/* Return Process */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Return Process
            </h2>

            <p className="text-gray-700 mb-4">
              To initiate a return, please contact our support team with:
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>• Order number</li>
              <li>• Photos of the product (if damaged/defective)</li>
              <li>• Reason for return</li>
            </ul>

            <p className="mt-4 text-gray-700">
              Email:{" "}
              <span className="text-[#C49A3A] font-medium">
                qaleengharr@gmail.com
              </span>
            </p>
          </div>

          {/* Refund Process */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Refund Process
            </h2>

            <p className="text-gray-700">
              Once the returned product is received and inspected, we will
              notify you about the approval or rejection of your refund.
            </p>

            <p className="mt-4 text-gray-700">
              If approved, the refund will be processed to the original payment
              method within{" "}
              <span className="font-semibold text-[#C49A3A]">
                5–10 business days
              </span>.
            </p>
          </div>

          {/* Shipping Costs */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Shipping Costs for Returns
            </h2>

            <p className="text-gray-700">
              If the return is due to a damaged or incorrect product,
              QaleenGhar will cover the return shipping cost.
            </p>

            <p className="mt-4 text-gray-700">
              For other reasons, the customer may be responsible for return
              shipping charges.
            </p>
          </div>

          {/* Cancellation */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Order Cancellation
            </h2>

            <p className="text-gray-700">
              Orders can be cancelled within{" "}
              <span className="font-semibold text-[#C49A3A]">
                24 hours
              </span>{" "}
              of placing the order. Once shipped, orders cannot be cancelled.
            </p>

            <p className="mt-4 text-gray-700">
              To request cancellation, please contact us immediately.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-[#F3EDE4] p-8 rounded-lg text-center">

            <h2 className="text-2xl font-semibold mb-4">
              Need Assistance?
            </h2>

            <p className="text-gray-700 mb-6">
              For any return or refund-related queries, feel free to reach out to our support team.
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

export default ReturnRefundPolicy;