import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAddressForm from "@/components/shopping-view/addAddressForm";

function AddressDialog({
  open,
  onOpenChange,
  onAddressAdded,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <button className="text-sm font-medium text-[#2F5D62] hover:underline">
          + Add new address
        </button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-[#FAF9F7]">
          <div>
            <h2 className="text-lg font-semibold text-[#2B2B2B]">
              Add delivery address
            </h2>
            <p className="text-xs text-[#7A7A7A]">
              Used for rug delivery
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <AddAddressForm
            onSuccess={() => onOpenChange(false)}
            onAddressSaved={onAddressAdded}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddressDialog;
