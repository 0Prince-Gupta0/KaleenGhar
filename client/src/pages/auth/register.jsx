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
        toast({ title: data.payload.message, variant: "success" });
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
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">

      {/* ✅ EXACT SAME CARD AS LOGIN */}
      <div
        className="
          space-y-4 sm:space-y-5   /* slightly tighter */

          p-5 sm:p-6 md:p-7

          rounded-2xl

          bg-white/70 backdrop-blur-md
          border border-[#E6DED1]/60

          shadow-[0_10px_30px_rgba(0,0,0,0.12)]
          sm:shadow-[0_20px_50px_rgba(0,0,0,0.18)]

          transition-all duration-300
        "
      >
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F2933]">
            Create your account
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-[#4B5563]">
            Already have an account?
            <Link
              className="ml-1 font-medium text-[#C9A24D] hover:text-[#B08B3C]"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>

        {/* FORM */}
        <CommonForm
          formControls={registerFormControls}
          buttonText={loading ? "Creating Account..." : "Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          isBtnDisabled={loading}
        />
      </div>
    </div>
  );
}

export default AuthRegister;