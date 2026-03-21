import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const collections = [
  {
    id: "royal-heritage",
    title: "Royal Heritage",
    subtitle: "Inspired by timeless Indian palaces",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: "persian-silk",
    title: "Persian Silk",
    subtitle: "Luxury woven with fine silk threads",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
  },
  {
    id: "modern-minimal",
    title: "Modern Minimal",
    subtitle: "Contemporary rugs for modern homes",
    image:
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab",
  },
];

function SignatureCollections() {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#FBF7F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2933]">
            Signature Collections
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#6B7280] max-w-xl mx-auto">
            Curated designs that define elegance and heritage.
          </p>
        </div>

        {/* GRID */}
        <div className="
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-5 sm:gap-6 lg:gap-10
        ">
          {collections.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate("/shop/listing")}
              className="
                group relative overflow-hidden rounded-2xl
                cursor-pointer
                active:scale-[0.98]
                transition
              "
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="
                  h-[260px] sm:h-[320px] lg:h-[420px]
                  w-full object-cover
                  transition-transform duration-700
                  group-hover:scale-105
                "
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40" />

              {/* CONTENT */}
              <div className="
                absolute bottom-4 sm:bottom-6 lg:bottom-8
                left-4 sm:left-6 lg:left-8
                right-4 sm:right-auto
                text-white
              ">
                <h3 className="
                  text-lg sm:text-xl lg:text-2xl 
                  font-bold
                ">
                  {item.title}
                </h3>

                <p className="
                  text-xs sm:text-sm 
                  text-gray-200 
                  mt-1 sm:mt-2
                  max-w-[90%]
                ">
                  {item.subtitle}
                </p>

                <Button
                  variant="outline"
                  className="
                    mt-3 sm:mt-4
                    text-xs sm:text-sm
                    px-4 sm:px-5
                    py-2 sm:py-2.5
                    border-white bg-black text-white
                    hover:bg-white hover:text-black
                    rounded-full
                    transition
                  "
                >
                  Explore
                </Button>
              </div>

              {/* GRADIENT (premium touch) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SignatureCollections;