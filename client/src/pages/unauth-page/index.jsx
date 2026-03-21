import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

function UnauthPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFCF7] px-4 sm:px-6 lg:px-8">
      
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl text-center">
        
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#F5EFE6]">
          <ShieldAlert className="h-8 w-8 sm:h-10 sm:w-10 text-[#C9A24D]" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2933]">
          Access Restricted
        </h1>

        {/* Message */}
        <p className="mt-4 text-sm sm:text-base text-[#6B7280] leading-relaxed px-2 sm:px-4">
          You don’t have permission to view this page.
          Please return to a section that you’re authorized to access.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          
          <Button
            className="w-full sm:w-auto bg-[#1F2933] hover:bg-black text-white px-6 py-2.5"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto border-[#C9A24D] text-[#C9A24D] hover:bg-[#C9A24D]/10 px-6 py-2.5"
            onClick={() => navigate("/")}
          >
            Home
          </Button>

        </div>

        {/* Brand */}
        <p className="mt-10 text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#C9A24D]">
          Qaleen Ghar
        </p>
      </div>
    </div>
  );
}

export default UnauthPage;