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

      <section className="pt-16 sm:pt-20 pb-12 sm:pb-14 text-center px-5 sm:px-6 lg:px-8">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1F2933]">
          Find Your Perfect Carpet
        </h1>

        {/* Description */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#6B7280] max-w-md sm:max-w-xl mx-auto px-3 sm:px-0 leading-relaxed">
          Search across handcrafted carpets by style, material, color or design.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mt-8 sm:mt-10">

          <div className="flex flex-col sm:flex-row gap-3">

            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search handcrafted carpets..."
              className="w-full h-12 rounded-xl sm:rounded-2xl text-sm sm:text-base"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <Button
              size="lg"
              onClick={handleSearch}
              className="w-full sm:w-auto h-12 px-6 sm:px-8"
            >
              Search
            </Button>

          </div>

        </div>

      </section>
    </div>
  );
}

export default SearchProducts;