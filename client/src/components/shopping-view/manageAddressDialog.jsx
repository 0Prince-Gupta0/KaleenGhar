import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddAddressForm from "./AddAddressForm";

export default function ManageAddressDialog({
  open,
  onOpenChange,
  editingAddress,
}) {
  const isEdit = !!editingAddress;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <AddAddressForm
          mode={isEdit ? "edit" : "add"}
          initialData={editingAddress}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
