import React from "react";

const About = () => {
  return (
    <div className="bg-[#FBF7F1] text-[#2E2E2E]">

      {/* HERO SECTION */}
<section className="relative h-[65vh] flex items-center justify-center text-center overflow-hidden">

  {/* Authentic Carpet Background */}
  <img
    src="https://images.unsplash.com/photo-1600166898405-da9535204843"
    alt="Traditional Carpet"
    className="absolute w-full h-full object-cover"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/55"></div>

  {/* Content */}
  <div className="relative z-10 px-6">

    <h1 className="text-4xl md:text-5xl font-semibold text-white">
      About
    </h1>

    {/* Qaleen Ghar Branding */}
    <h2
      className="mt-3 text-4xl md:text-5xl font-bold tracking-[0.35em]"
      style={{ color: "#C49A3A" }}
    >
      QALEEN GHAR
    </h2>

    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
      Bringing the heritage of Bhadohi carpet craftsmanship to modern interiors
      across the world.
    </p>

  </div>

</section>
      {/* ABOUT CONTENT */}
     <section className="bg-[#FBF7F1] py-24">

  <div className="max-w-6xl mx-auto px-6">

    {/* Section Title */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-semibold text-[#2E2E2E]">
        About <span style={{ color: "#C49A3A" }}>QaleenGhar</span>
      </h2>

      <div className="w-24 h-[2px] bg-[#C49A3A] mx-auto mt-4"></div>
    </div>

    {/* Content */}
    <div className="grid md:grid-cols-2 gap-14 items-center">

      {/* Image */}
      <div className="relative group">
        <img
          src="https://images.unsplash.com/photo-1600166898405-da9535204843"
          alt="Bhadohi Carpet Craftsmanship"
          className="rounded-lg shadow-lg group-hover:scale-105 transition duration-500"
        />

        <div className="absolute -bottom-6 -right-6 bg-[#F3EDE4] px-6 py-4 shadow-md">
          <p className="text-sm tracking-widest font-semibold text-[#C49A3A]">
            EST. 1990
          </p>
        </div>
      </div>

      {/* Text */}
      <div className="space-y-6 leading-relaxed text-gray-700">

        <p>
          Welcome to{" "}
          <span className="font-semibold text-[#C49A3A]">
            QaleenGhar
          </span>
          , a trusted name in quality carpets and fine craftsmanship.
          Our journey began in{" "}
          <strong>Bhadohi, India — the carpet capital of the country.</strong>
        </p>

        <p>
          What started as a small family business by our grandfather in
          <strong> 1990 </strong>
          has grown into a brand dedicated to delivering beautifully crafted
          carpets to customers across India and beyond.
        </p>

        <p>
          With decades of experience in the carpet industry, we specialize in
          manufacturing high-quality carpets in various styles, designs, and
          materials. Our expertise particularly lies in{" "}
          <span className="font-semibold text-[#C49A3A]">
            hand-tufted carpets
          </span>
          , known for their durability, elegance, and intricate craftsmanship.
        </p>

        <p>
          At QaleenGhar, we proudly operate our own manufacturing facility in
          Bhadohi where skilled artisans combine traditional weaving techniques
          with modern design concepts while maintaining strict quality control.
        </p>

        <p>
          Each carpet we produce carries a story of{" "}
          <span className="font-semibold text-[#C49A3A]">
            heritage, craftsmanship, and attention to detail
          </span>
          . Whether for homes, offices, hotels, or commercial spaces, our
          carpets enhance interiors with comfort, style, and lasting quality.
        </p>

        <p className="text-[#2E2E2E] font-medium">
          Our goal is simple — to bring the beauty of authentic Bhadohi
          craftsmanship to customers seeking premium carpets that combine
          tradition with contemporary design.
        </p>

      </div>

    </div>
  </div>

</section>


      {/* MISSION & VISION */}
<section className="bg-[#FBF7F1] py-24">

  <div className="max-w-6xl mx-auto px-6">

    {/* Section Title */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-semibold text-[#2E2E2E]">
        Our <span className="text-[#C49A3A]">Purpose</span>
      </h2>
      <div className="w-24 h-[2px] bg-[#C49A3A] mx-auto mt-4"></div>
    </div>

    {/* Content */}
    <div className="grid md:grid-cols-2 gap-16 items-start">

      {/* Mission */}
      <div>
        <h3 className="text-2xl font-semibold text-[#2E2E2E] mb-6">
          Our Mission
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Our mission at <span className="text-[#C49A3A] font-semibold">QaleenGhar</span> is to preserve and promote 
          the rich heritage of Bhadohi carpet craftsmanship while delivering premium-quality carpets 
          that meet modern design and lifestyle needs.
        </p>

        <ul className="space-y-3 text-gray-600">
          <li>✓ Provide high-quality handmade and hand-tufted carpets</li>
          <li>✓ Support and empower skilled artisans from Bhadohi</li>
          <li>✓ Maintain excellent craftsmanship and durable materials</li>
          <li>✓ Offer carpets combining tradition, elegance, and comfort</li>
        </ul>
      </div>

      {/* Vision */}
      <div>
        <h3 className="text-2xl font-semibold text-[#2E2E2E] mb-6">
          Our Vision
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Our vision is to become a globally recognized carpet brand from Bhadohi, 
          known for quality, authenticity, and craftsmanship.
        </p>

        <ul className="space-y-3 text-gray-600">
          <li>✓ Expand our reach to customers worldwide</li>
          <li>✓ Promote Indian handmade carpets globally</li>
          <li>✓ Continuously innovate in design and texture</li>
          <li>✓ Preserve traditional carpet making for future generations</li>
        </ul>
      </div>

    </div>

  </div>

</section>

      {/* WHY CHOOSE */}
     {/* WHY CHOOSE */}
<section className="py-24 bg-[#F3EDE4]">

  <div className="max-w-6xl mx-auto px-6">

    {/* Title */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-semibold text-[#2E2E2E]">
        Why Choose <span className="text-[#C49A3A]">QaleenGhar</span>
      </h2>
      <div className="w-24 h-[2px] bg-[#C49A3A] mx-auto mt-4"></div>
    </div>

    {/* Features */}
    <div className="grid md:grid-cols-3 gap-10">

      {/* Card */}
      <div className="group bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition duration-300 border border-transparent hover:border-[#C49A3A]/40">

        <div className="text-[#C49A3A] text-3xl mb-4">★</div>

        <h4 className="font-semibold text-lg mb-2">
          Since 1990 Experience
        </h4>

        <p className="text-gray-600">
          Over three decades of expertise in carpet manufacturing and craftsmanship.
        </p>

      </div>

      {/* Card */}
      <div className="group bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition duration-300 border border-transparent hover:border-[#C49A3A]/40">

        <div className="text-[#C49A3A] text-3xl mb-4">✦</div>

        <h4 className="font-semibold text-lg mb-2">
          Bhadohi Heritage
        </h4>

        <p className="text-gray-600">
          Authentic carpets originating from India's world-renowned carpet capital.
        </p>

      </div>

      {/* Card */}
      <div className="group bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition duration-300 border border-transparent hover:border-[#C49A3A]/40">

        <div className="text-[#C49A3A] text-3xl mb-4">⚒</div>

        <h4 className="font-semibold text-lg mb-2">
          Own Manufacturing
        </h4>

        <p className="text-gray-600">
          Direct production ensures strict quality control and authentic craftsmanship.
        </p>

      </div>

      {/* Card */}
      <div className="group bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition duration-300 border border-transparent hover:border-[#C49A3A]/40">

        <div className="text-[#C49A3A] text-3xl mb-4">◆</div>

        <h4 className="font-semibold text-lg mb-2">
          Hand-Tufted Specialists
        </h4>

        <p className="text-gray-600">
          Premium hand-tufted carpets known for durability and elegant designs.
        </p>

      </div>

      {/* Card */}
      <div className="group bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition duration-300 border border-transparent hover:border-[#C49A3A]/40">

        <div className="text-[#C49A3A] text-3xl mb-4">⬚</div>

        <h4 className="font-semibold text-lg mb-2">
          Wide Range of Carpets
        </h4>

        <p className="text-gray-600">
          Designs suitable for homes, offices, hotels, and commercial spaces.
        </p>

      </div>

      {/* Card */}
      <div className="group bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition duration-300 border border-transparent hover:border-[#C49A3A]/40">

        <div className="text-[#C49A3A] text-3xl mb-4">✔</div>

        <h4 className="font-semibold text-lg mb-2">
          Trusted Craftsmanship
        </h4>

        <p className="text-gray-600">
          Every carpet is crafted with precision, care, and attention to detail.
        </p>

      </div>

    </div>

  </div>

</section>

    </div>
  );
};

export default About;