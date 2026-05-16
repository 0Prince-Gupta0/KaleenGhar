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

  const isPhoneValid = /^[0-9]{10}$/.test(form.phone.trim());
  const isPincodeValid = /^[1-9][0-9]{5}$/.test(form.pincode.trim());

  const isFormValid =
    form.address.trim() !== "" &&
    form.city.trim() !== "" &&
    isPincodeValid &&
    isPhoneValid;

  function handleChange(e) {
    const { name, value } = e.target;
    
    if (name === "phone" || name === "pincode") {
      const numericValue = value.replace(/\D/g, "");
      if (name === "phone" && numericValue.length > 10) return;
      if (name === "pincode" && numericValue.length > 6) return;
      setForm({ ...form, [name]: numericValue });
      return;
    }

    setForm({ ...form, [name]: value });
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

    //console.log(payload);
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
          placeholder="Pincode (6 digits)"
          value={form.pincode}
          onChange={handleChange}
          maxLength={6}
          pattern="^[1-9][0-9]{5}$"
          title="Please enter a valid 6-digit Indian pincode"
          required
        />
      </div>

      <Input
        name="phone"
        placeholder="Phone number (10 digits)"
        value={form.phone}
        onChange={handleChange}
        maxLength={10}
        pattern="^[0-9]{10}$"
        title="Please enter a valid 10-digit phone number"
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
