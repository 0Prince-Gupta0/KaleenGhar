import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { Check, Pencil, Trash2 } from "lucide-react";

function SavedAddresses({
  selectedAddress,
  setSelectedAddress,
  onEdit,
  onDelete,
}) {
  const { addressList = [], isLoading } = useSelector(
    (state) => state.shopAddress
  );

  /* ================= LOADING ================= */
  if (isLoading) {
    return <p className="text-sm text-[#7A6F63]">Loading saved addresses…</p>;
  }

  /* ================= EMPTY ================= */
  if (!addressList.length) {
    return <p className="text-sm text-[#7A6F63]">No saved addresses yet</p>;
  }

  /* ================= LIST ================= */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {addressList.map((addr) => {
        const isSelected = selectedAddress?._id === addr._id;

        return (
          <div
            key={addr._id}
            onClick={() => setSelectedAddress(addr)}
            className={cn(
              `
              relative
              cursor-pointer
              rounded-xl
              border
              p-4
              transition-all
              `,
              isSelected
                ? "border-[#C9A24D] bg-[#FFFBF2] shadow-sm"
                : "border-[#E6DED1] hover:border-[#C9A24D]"
            )}
          >
            {/* ✅ SELECTED TICK */}
            {isSelected && (
              <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[#C9A24D] flex items-center justify-center">
                <Check size={14} className="text-[#2B2B2B]" />
              </div>
            )}

            {/* ✏️ EDIT + 🗑 DELETE */}
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(addr);
                }}
                className="p-1 rounded hover:bg-[#EFE6D8]"
              >
                <Pencil size={14} className="text-[#7A6F63]" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(addr);
                }}
                className="p-1 rounded hover:bg-[#FDEAEA]"
              >
                <Trash2 size={14} className="text-red-500" />
              </button>
            </div>

            {/* CITY */}
            <p className="font-medium text-sm text-[#2B2B2B]">
              {addr.city}
            </p>

            {/* ADDRESS */}
            <p className="text-xs text-[#7A6F63] mt-1">
              {addr.address}
            </p>

            {/* PIN + PHONE */}
            <p className="text-xs text-[#7A6F63] mt-1">
              {addr.pincode} · {addr.phone}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default SavedAddresses;
