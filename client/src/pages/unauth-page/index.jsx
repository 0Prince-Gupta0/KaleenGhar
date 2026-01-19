import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

function UnauthPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFCF7] px-6">
      <div className="max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EFE6]">
          <ShieldAlert className="h-10 w-10 text-[#C9A24D]" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#1F2933]">
          Access Restricted
        </h1>

        {/* Message */}
        <p className="mt-4 text-[#6B7280] leading-relaxed">
          You don’t have permission to view this page.
          Please return to a section that you’re authorized to access.
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
          Qaleen Ghar
        </p>
      </div>
    </div>
  );
}

export default UnauthPage;
