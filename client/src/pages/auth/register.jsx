import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(e) {
    e.preventDefault();

    if (!formData.userName || !formData.email || !formData.password) {
      toast({
        title: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    dispatch(registerUser(formData)).then((data) => {
      setLoading(false);

      if (data?.payload?.success) {
        toast({ title: data.payload.message, variant:"success" });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message || "Registration failed",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div
      className="
        mx-auto w-full max-w-md space-y-6 p-8
        rounded-2xl
        bg-[#FFFCF7]
        border border-[#E6DED1]
        ring-1 ring-black/5
        shadow-[0_20px_50px_rgba(0,0,0,0.18)]
        hover:shadow-[0_28px_70px_rgba(0,0,0,0.22)]
        transition-shadow duration-300
      "
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#1F2933]">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-[#4B5563]">
          Already have an account?
          <Link
            className="ml-1 font-medium text-[#C9A24D] hover:text-[#B08B3C] transition-colors"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={registerFormControls}
        buttonText={loading ? "Creating Account..." : "Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={loading}
      />
    </div>
  );
}

export default AuthRegister;
