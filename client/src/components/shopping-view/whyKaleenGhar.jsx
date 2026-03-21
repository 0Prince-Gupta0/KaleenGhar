const reasons = [
  {
    title: "Handcrafted Excellence",
    desc: "Every rug is meticulously handwoven by master artisans with decades of expertise.",
  },
  {
    title: "Premium Materials",
    desc: "Only the finest natural wool and silk, responsibly sourced for lasting beauty.",
  },
  {
    title: "Timeless Designs",
    desc: "Elegant patterns inspired by heritage, designed to stay relevant forever.",
  },
  {
    title: "Made to Last",
    desc: "Built for durability, comfort, and generations of everyday living.",
  },
];

function WhyQaleenGhar() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#FBF7F1]" />

      {/* SOFT GLOW (responsive sized) */}
      <div className="absolute -top-20 sm:-top-32 -right-20 sm:-right-32 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] bg-[#C9A24D]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 sm:-bottom-32 -left-20 sm:-left-32 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] bg-[#1F2933]/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <span className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[10px] sm:text-sm text-[#C9A24D]">
            Our Promise
          </span>

          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2933]">
            Why Qaleen Ghar
          </h2>

          <p className="mt-4 sm:mt-6 max-w-xl mx-auto text-sm sm:text-base text-[#6B7280] leading-relaxed">
            A blend of craftsmanship, quality, and timeless aesthetics — created
            to elevate your living spaces.
          </p>
        </div>

        {/* CARDS */}
        <div className="
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-4 sm:gap-6 lg:gap-10
        ">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="
                group
                bg-[#FFFCF7]
                border border-[#E6DED1]
                rounded-xl sm:rounded-2xl
                p-5 sm:p-6 lg:p-8
                text-center
                shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]
                transition-all duration-500
                hover:-translate-y-1 sm:hover:-translate-y-2
                active:scale-[0.98]
              "
            >
              {/* ICON */}
              <div
                className="
                  mx-auto mb-4 sm:mb-6
                  w-12 h-12 sm:w-14 sm:h-14
                  rounded-full
                  bg-[#C9A24D]/15
                  flex items-center justify-center
                  text-[#C9A24D]
                  text-base sm:text-xl
                  font-semibold
                "
              >
                {index + 1}
              </div>

              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#1F2933] mb-2 sm:mb-3">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyQaleenGhar;