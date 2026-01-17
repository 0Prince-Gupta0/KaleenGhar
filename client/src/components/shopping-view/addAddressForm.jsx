import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addNewAddress,
  fetchAllAddresses,
  editaAddress
} from "@/store/shop/address-slice";
import { useToast } from "@/components/ui/use-toast";

function AddAddressForm({
  mode = "add",                // "add" | "edit"
  initialData = null,          // address object for edit
  onSuccess,
  onAddressSaved,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const [form, setForm] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  });

  /* ✅ Prefill form in EDIT mode */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        address: initialData.address || "",
        city: initialData.city || "",
        pincode: initialData.pincode || "",
        phone: initialData.phone || "",
        notes: initialData.notes || "",
      });
    }
    // console.log(form);
  }, [mode, initialData]);

  const isFormValid =
    form.address.trim() &&
    form.city.trim() &&
    form.pincode.trim() &&
    form.phone.trim();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid || !user?.id) return;

    const payload = {
      userId: user.id,
      address: form.address.trim(),
      city: form.city.trim(),
      pincode: form.pincode.trim(),
      phone: form.phone.trim(),
      notes: form.notes?.trim() || "",
    };

    console.log(payload);
    const action =
      mode === "edit"
        ? editaAddress({userId: user.id, addressId: initialData._id, formData: payload })
        : addNewAddress(payload);

    const res = await dispatch(action);

    if (res?.payload?.success) {
      dispatch(fetchAllAddresses(user.id));

      onAddressSaved(res.payload.data);
      onSuccess();

      toast({
        title:
          mode === "edit"
            ? "Address updated successfully"
            : "Address added successfully",
        variant: "success",
      });
    } else {
      toast({
        title: "Something went wrong",
        description: res?.payload?.message,
        variant: "destructive",
      });
    }
  }
// console.log(mode);
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="address"
        placeholder="Street address"
        value={form.address}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <Input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        name="phone"
        placeholder="Phone number"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <Input
        name="notes"
        placeholder="Landmark / Notes"
        value={form.notes}
        onChange={handleChange}
      />

      <Button
        type="submit"
        disabled={!isFormValid}
        className="
          w-full
          bg-[#C9A24D]
          hover:bg-[#B8923F]
          text-[#2B2B2B]
          font-semibold
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {mode === "edit" ? "Update Address" : "Save Address"}
      </Button>
    </form>
  );
}

export default AddAddressForm;
