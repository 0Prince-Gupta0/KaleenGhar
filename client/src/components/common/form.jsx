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
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(control) {
    const value = formData[control.name] ?? "";

    const commonChangeHandler = (val) =>{
      
      console.log(control.name);
      console.log(val);
      setFormData({
        ...formData,
        [control.name]: val,
      });
    }

    switch (control.componentType) {
      case "input":
        return (
          <Input
            id={control.name}
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) => commonChangeHandler(e.target.value)}
            className="bg-[#FFFCF7]"
          />
        );

      case "select":
        return (
          <Select
            key={control.name + value}
            value={value}
            onValueChange={(val) => commonChangeHandler(val)}
          >
            <SelectTrigger className="bg-[#FFFCF7]">
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) => commonChangeHandler(e.target.value)}
            className="bg-[#FFFCF7] min-h-[90px]"
          />
        );
case "switch":
  return (
    <div className="flex items-center gap-3">
      {/* <label className="text-sm">{control.label}</label> */}

      <button
        type="button"
        onClick={() => commonChangeHandler(!value)}
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
    </div>
  );

      default:
        return (
          <Input
            id={control.name}
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) => commonChangeHandler(e.target.value)}
            className="bg-[#FFFCF7]"
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-5">
        {formControls.map((control) => (
          <div key={control.name} className="grid gap-1.5">
            <Label className="text-sm font-medium text-[#1F2933]">
              {control.label}
            </Label>
            {renderInputsByComponentType(control)}
          </div>
        ))}
      </div>

      <Button
        type="submit"
        disabled={isBtnDisabled}
        className="w-full bg-[#1F2933] hover:bg-black text-white font-medium py-2.5 rounded-lg transition"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
