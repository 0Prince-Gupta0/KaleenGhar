const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Interior Designer",
    text: "The craftsmanship is extraordinary. It completely transformed our living room into a warm, elegant space.",
  },
  {
    name: "Rohit Mehta",
    role: "Home Owner",
    text: "Truly premium quality. You can feel the heritage and attention to detail the moment you see it.",
  },
  {
    name: "Neha Kapoor",
    role: "Architect",
    text: "Elegant, timeless, and beautifully made. Exactly what I look for in high-end interiors.",
  },
];

function Testimonials() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#FFFCF7]" />
      <div className="absolute -top-32 right-0 w-[420px] h-[420px] bg-[#C9A24D]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-0 w-[420px] h-[420px] bg-[#1F2933]/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-20">
          <span className="uppercase tracking-[0.35em] text-sm text-[#C9A24D]">
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl font-extrabold text-[#1F2933]">
            Loved by Our Customers
          </h2>

          <p className="mt-6 max-w-xl mx-auto text-[#6B7280] leading-relaxed">
            Hear from people who have brought Qaleen Ghar craftsmanship into
            their homes.
          </p>
        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="
                group
                bg-white/80
                backdrop-blur
                border border-[#E6DED1]
                rounded-2xl
                p-8
                shadow-[0_12px_35px_rgba(0,0,0,0.10)]
                hover:shadow-[0_30px_65px_rgba(0,0,0,0.18)]
                transition-all duration-500
                hover:-translate-y-2
              "
            >
              {/* QUOTE ICON */}
              <div className="text-5xl text-[#C9A24D] leading-none mb-4">
                “
              </div>

              {/* TEXT */}
              <p className="text-[#4B5563] leading-relaxed mb-8">
                {item.text}
              </p>

              {/* AUTHOR */}
              <div className="pt-6 border-t border-[#E6DED1]">
                <p className="font-semibold text-[#1F2933]">
                  {item.name}
                </p>
                <p className="text-sm text-[#6B7280]">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
