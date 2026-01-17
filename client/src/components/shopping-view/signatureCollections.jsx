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
    <section className="py-28 bg-[#FBF7F1]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1F2933]">
            Signature Collections
          </h2>
          <p className="mt-4 text-[#6B7280] max-w-xl mx-auto">
            Curated designs that define elegance and heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {collections.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => navigate("/shop/listing")}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-sm text-gray-200 mt-2">
                  {item.subtitle}
                </p>

                <Button
                  variant="outline"
                  className="mt-4 border-white  bg-black text-white hover:bg-white hover:text-black"
                >
                  Explore
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SignatureCollections;
