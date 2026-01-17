import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import AddAddressForm from "@/components/shopping-view/addAddressForm";

function EditAddressDialog({
  open,
  setOpen,
  address,
  onUpdated,
}) {
    // console.log(address);
  if (!address) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* HEADER */}
        <div className="px-5 py-4 border-b bg-[#FAF9F7]">
          <h2 className="text-lg font-semibold text-[#2B2B2B]">
            Edit delivery address
          </h2>
          <p className="text-xs text-[#7A7A7A]">
            Update your saved address
          </p>
        </div>

        {/* FORM */}
        <div className="px-5 py-5">
          <AddAddressForm
            mode="edit"
            initialData={address}
            onSuccess={() => {
              setOpen(false);
            }}
            onAddressSaved={onUpdated}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditAddressDialog;
