import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls = [],
  formData = {},
  setFormData,
  onSubmit,
  buttonText = "Submit",
  isBtnDisabled = false,
  hideSubmit = false, // ⭐ new prop
}) {
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderInput = (control) => {
    const value = formData?.[control.name] ?? "";

    switch (control.componentType) {
      case "input":
        return (
          <Input
            id={control.name}
            name={control.name}
            type={control.type || "text"}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) => handleChange(control.name, e.target.value)}
            className="bg-[#FFFCF7]"
          />
        );

      case "textarea":
        return (
          <Textarea
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) => handleChange(control.name, e.target.value)}
            className="bg-[#FFFCF7] min-h-[100px]"
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) => handleChange(control.name, val)}
          >
            <SelectTrigger className="bg-[#FFFCF7]">
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "switch":
        return (
          <button
            type="button"
            onClick={() => handleChange(control.name, !value)}
            className={`w-12 h-6 rounded-full transition ${
              value ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full transition transform ${
                value ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        );

      default:
        return (
          <Input
            id={control.name}
            name={control.name}
            value={value}
            onChange={(e) => handleChange(control.name, e.target.value)}
            className="bg-[#FFFCF7]"
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-5">
        {formControls.map((control) => (
          <div key={control.name} className="grid gap-1.5">
            <Label className="text-sm font-medium text-[#1F2933]">
              {control.label}
            </Label>
            {renderInput(control)}
          </div>
        ))}
      </div>

      {/* ✅ Submit button optional */}
      {!hideSubmit && (
        <Button
          type="submit"
          disabled={isBtnDisabled}
          className="w-full bg-[#1F2933] hover:bg-black text-white font-medium py-2.5 rounded-lg transition"
        >
          {buttonText}
        </Button>
      )}
    </form>
  );
}

export default CommonForm;