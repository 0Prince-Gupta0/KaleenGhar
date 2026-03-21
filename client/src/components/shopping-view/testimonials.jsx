const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Interior Designer",
    text: "I’ve used a lot of carpets in my projects, but this one really stood out. The detailing and finish added a nice warmth to the entire space.",
  },
  {
    name: "Rohit Mehta",
    role: "Home Owner",
    text: "The quality is genuinely impressive. It looks even better in person and fits perfectly with our home decor.",
  },
  {
    name: "Neha Kapoor",
    role: "Architect",
    text: "What I liked most is how subtle yet elegant the design is. It blends in beautifully without overpowering the space.",
  },
];

function Testimonials() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#FFFCF7]" />

      {/* RESPONSIVE BLOBS */}
      <div className="absolute -top-20 sm:-top-32 right-0 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] bg-[#C9A24D]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 sm:-bottom-32 left-0 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] bg-[#1F2933]/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <span className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[10px] sm:text-sm text-[#C9A24D]">
            Testimonials
          </span>

          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2933]">
            Loved by Our Customers
          </h2>

          <p className="mt-4 sm:mt-6 max-w-xl mx-auto text-sm sm:text-base text-[#6B7280] leading-relaxed">
            Hear from people who have brought Qaleen Ghar craftsmanship into
            their homes.
          </p>
        </div>

        {/* CARDS */}
        <div className="
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-4 sm:gap-6 lg:gap-10
        ">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="
                group
                bg-white/80
                backdrop-blur
                border border-[#E6DED1]
                rounded-xl sm:rounded-2xl
                p-5 sm:p-6 lg:p-8
                shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                hover:shadow-[0_25px_55px_rgba(0,0,0,0.16)]
                transition-all duration-500
                hover:-translate-y-1 sm:hover:-translate-y-2
                active:scale-[0.98]
              "
            >
              {/* QUOTE */}
              <div className="text-3xl sm:text-4xl lg:text-5xl text-[#C9A24D] leading-none mb-3 sm:mb-4">
                “
              </div>

              {/* TEXT */}
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6 sm:mb-8">
                {item.text}
              </p>

              {/* AUTHOR */}
              <div className="pt-4 sm:pt-6 border-t border-[#E6DED1]">
                <p className="font-semibold text-sm sm:text-base text-[#1F2933]">
                  {item.name}
                </p>
                <p className="text-xs sm:text-sm text-[#6B7280]">
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