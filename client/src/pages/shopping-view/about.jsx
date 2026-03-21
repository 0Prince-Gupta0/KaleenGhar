import React from "react";

const About = () => {
  return (
    <div className="bg-[#FBF7F1] text-[#2E2E2E]">

      {/* HERO SECTION */}
      <section className="relative h-[55vh] sm:h-[60vh] md:h-[65vh] flex items-center justify-center text-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1600166898405-da9535204843"
          alt="Traditional Carpet"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative z-10 px-4 sm:px-6 max-w-4xl">

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            About
          </h1>

          <h2
            className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.2em] sm:tracking-[0.3em]"
            style={{ color: "#C49A3A" }}
          >
            QALEEN GHAR
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
            Bringing the heritage of Bhadohi carpet craftsmanship to modern interiors
            across the world.
          </p>

        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              About <span className="text-[#C49A3A]">QaleenGhar</span>
            </h2>
            <div className="w-20 sm:w-24 h-[2px] bg-[#C49A3A] mx-auto mt-3 sm:mt-4"></div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-center">

            {/* Image */}
            <div className="relative group max-w-md mx-auto md:max-w-full">
              <img
                src="https://images.unsplash.com/photo-1600166898405-da9535204843"
                alt="Bhadohi Carpet Craftsmanship"
                className="rounded-lg shadow-lg w-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-[#F3EDE4] px-4 sm:px-6 py-2 sm:py-4 shadow-md">
                <p className="text-xs sm:text-sm tracking-widest font-semibold text-[#C49A3A]">
                  EST. 1990
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed text-gray-700">

              <p>
                Welcome to <span className="font-semibold text-[#C49A3A]">QaleenGhar</span>, 
                a trusted name in quality carpets and fine craftsmanship.
                Our journey began in <strong>Bhadohi, India — the carpet capital.</strong>
              </p>

              <p>
                What started as a small family business in <strong>1990</strong> 
                has grown into a brand delivering beautifully crafted carpets worldwide.
              </p>

              <p>
                We specialize in <span className="font-semibold text-[#C49A3A]">hand-tufted carpets</span>, 
                known for durability, elegance, and craftsmanship.
              </p>

              <p>
                Our own manufacturing facility ensures strict quality control 
                while blending traditional and modern designs.
              </p>

              <p>
                Each carpet reflects <span className="font-semibold text-[#C49A3A]">heritage and precision</span>.
              </p>

              <p className="text-[#2E2E2E] font-medium">
                Bringing authentic craftsmanship to modern homes worldwide.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Our <span className="text-[#C49A3A]">Purpose</span>
            </h2>
            <div className="w-20 sm:w-24 h-[2px] bg-[#C49A3A] mx-auto mt-3 sm:mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">

            {/* Mission */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                Our Mission
              </h3>

              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Preserve Bhadohi craftsmanship while delivering premium carpets.
              </p>

              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
                <li>✓ Handmade & hand-tufted carpets</li>
                <li>✓ Support artisans</li>
                <li>✓ High-quality materials</li>
                <li>✓ Elegant & durable designs</li>
              </ul>
            </div>

            {/* Vision */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                Our Vision
              </h3>

              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Become a globally recognized brand.
              </p>

              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
                <li>✓ Global expansion</li>
                <li>✓ Promote Indian carpets</li>
                <li>✓ Design innovation</li>
                <li>✓ Preserve tradition</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F3EDE4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Why Choose <span className="text-[#C49A3A]">QaleenGhar</span>
            </h2>
            <div className="w-20 sm:w-24 h-[2px] bg-[#C49A3A] mx-auto mt-3 sm:mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">

            {[
              "Since 1990 Experience",
              "Bhadohi Heritage",
              "Own Manufacturing",
              "Hand-Tufted Specialists",
              "Wide Range",
              "Trusted Craftsmanship"
            ].map((title, i) => (
              <div
                key={i}
                className="group bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-xl transition duration-300 border hover:border-[#C49A3A]/40"
              >
                <div className="text-[#C49A3A] text-2xl sm:text-3xl mb-3 sm:mb-4">★</div>
                <h4 className="font-semibold text-base sm:text-lg mb-2">
                  {title}
                </h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Premium craftsmanship and quality assurance.
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;