import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFCF7] px-4 sm:px-6 md:px-8">
      
      <div className="max-w-xl w-full text-center">
        
        {/* 404 */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-[#C9A24D] tracking-wide">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold text-[#1F2933]">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#6B7280] leading-relaxed px-2">
          The page you are looking for doesn’t exist or may have been moved.
          Let’s get you back to something beautiful.
        </p>

        {/* Actions */}
        <div
          className="
            mt-6 sm:mt-8
            flex flex-col sm:flex-row
            items-center justify-center
            gap-3 sm:gap-4
          "
        >
          <Button
            className="w-full sm:w-auto bg-[#1F2933] hover:bg-black text-white px-6"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D]/10 px-6"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </div>

        {/* Brand */}
        <p className="mt-8 sm:mt-10 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C9A24D]">
          Qaleen Ghar
        </p>
      </div>
    </div>
  );
}

export default NotFound;