function BrandStory() {
  return (
    <section className="py-28 bg-[#FFFCF7]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <img
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
          alt="Craftsmanship"
          className="rounded-2xl object-cover h-[480px] w-full"
        />

        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-[#C9A24D] mb-4">
            Our Craft
          </p>
          <h2 className="text-4xl font-bold text-[#1F2933] leading-tight">
            Crafted by Artisans. <br /> Perfected Over Generations.
          </h2>

          <p className="mt-6 text-[#6B7280] leading-relaxed">
            Every Kaleen Ghar rug is handcrafted by skilled artisans using
            time-honored weaving techniques. Each knot reflects patience,
            tradition, and unmatched craftsmanship.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BrandStory;
