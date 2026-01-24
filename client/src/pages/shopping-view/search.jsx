import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!keyword.trim()) return;

    navigate(`/shop/listing?search=${encodeURIComponent(keyword.trim())}`);
  };

  return (
    <div className="bg-[#FBF7F1] min-h-[calc(100vh-64px)]">
      <section className="pt-20 pb-14 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F2933]">
          Find Your Perfect Carpet
        </h1>

        <p className="mt-4 text-[#6B7280] max-w-xl mx-auto">
          Search across handcrafted carpets by style, material, color or design.
        </p>

        <div className="max-w-2xl mx-auto mt-10 px-4 flex gap-3">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search handcrafted carpets..."
            className="py-7 px-6 rounded-2xl border shadow-sm"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <Button
            size="lg"
            onClick={handleSearch}
            className="px-8"
          >
            Search
          </Button>
        </div>
      </section>
    </div>
  );
}

export default SearchProducts;
