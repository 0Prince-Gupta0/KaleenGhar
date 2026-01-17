import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFCF7] px-6">
      <div className="max-w-xl text-center">
        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-[#C9A24D] tracking-wide">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-3xl font-bold text-[#1F2933]">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-[#6B7280] leading-relaxed">
          The page you are looking for doesn’t exist or may have been moved.
          Let’s get you back to something beautiful.
        </p>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Button
            className="bg-[#1F2933] hover:bg-black text-white px-6"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Button
            variant="outline"
            className="border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D]/10 px-6"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </div>

        {/* Brand */}
        <p className="mt-10 text-xs tracking-[0.3em] uppercase text-[#C9A24D]">
          Kaleen Ghar
        </p>
      </div>
    </div>
  );
}

export default NotFound;
