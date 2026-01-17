import { Pencil, Trash2, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : undefined
      }
      className={cn(
        `
        relative
        cursor-pointer
        rounded-xl
        border
        transition-all
        hover:shadow-md
        `,
        isSelected
          ? "border-[#C9A24D] bg-[#FFFCF7] shadow-md"
          : "border-[#E6DED1] bg-white"
      )}
    >
      {/* ✅ Selected Indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 bg-[#C9A24D] text-[#2B2B2B] rounded-full p-1">
          <Check className="h-4 w-4" />
        </div>
      )}

      {/* 🔧 ACTIONS */}
      <div className="absolute top-3 right-3 flex gap-1">
        <Button
          size="icon"
          variant="ghost"
          className="text-[#6B7280] hover:text-[#1F2933]"
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="text-red-500 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* ================= CONTENT ================= */}
      <CardContent className="space-y-2 p-4 pr-16 text-sm text-[#1F2933]">
        <p className="font-medium">
          {addressInfo?.address}
        </p>
        <p className="text-muted-foreground">
          {addressInfo?.city} – {addressInfo?.pincode}
        </p>
        <p className="text-muted-foreground">
          Phone: {addressInfo?.phone}
        </p>
        {addressInfo?.notes && (
          <p className="text-xs text-muted-foreground">
            {addressInfo?.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default AddressCard;
