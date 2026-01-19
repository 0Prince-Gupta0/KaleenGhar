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
    <section className="relative py-28 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#FBF7F1]" />
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-[#C9A24D]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] bg-[#1F2933]/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-20">
          <span className="uppercase tracking-[0.35em] text-sm text-[#C9A24D]">
            Our Promise
          </span>

          <h2 className="mt-4 text-4xl font-extrabold text-[#1F2933]">
            Why Qaleen Ghar
          </h2>

          <p className="mt-6 max-w-xl mx-auto text-[#6B7280] leading-relaxed">
            A blend of craftsmanship, quality, and timeless aesthetics — created
            to elevate your living spaces.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="
                group
                bg-[#FFFCF7]
                border border-[#E6DED1]
                rounded-2xl
                p-8
                text-center
                shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_25px_55px_rgba(0,0,0,0.14)]
                transition-all duration-500
                hover:-translate-y-2
              "
            >
              {/* ICON PLACEHOLDER */}
              <div
                className="
                  mx-auto mb-6
                  w-14 h-14
                  rounded-full
                  bg-[#C9A24D]/15
                  flex items-center justify-center
                  text-[#C9A24D]
                  text-xl
                  font-bold
                "
              >
                {index + 1}
              </div>

              <h3 className="text-lg font-semibold text-[#1F2933] mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-[#6B7280] leading-relaxed">
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
