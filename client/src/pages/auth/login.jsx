import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { checkAuth, loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import axios from "axios";
import { Button } from "@/components/ui/button";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      await axios.post(
        `${BASE_URL}/api/auth/google-login`,
        {
          email: result.user.email,
          name: result.user.displayName,
        },
        { withCredentials: true }
      );
      dispatch(checkAuth());
      navigate("/shop/home");
    } catch (error) {
      console.error(error);
    }
  };

  function onSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Email and password are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    dispatch(loginUser(formData)).then((data) => {
      setLoading(false);

      if (data?.payload?.success) {
        toast({ title: data.payload.message, variant: "success" });
        navigate("/");
      } else {
        toast({
          title: data?.payload?.message || "Login failed",
          variant: "destructive",
        });
      }
    });
  }

return (
  <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
    
    {/* 🔥 CARD (SOFT, NOT HEAVY) */}
    <div
      className="
        space-y-5 sm:space-y-6

        p-5 sm:p-6 md:p-7

        rounded-2xl

        /* LIGHT CARD (NOT SAME AS BACKGROUND) */
        bg-white/70 backdrop-blur-md

        /* SOFT BORDER */
        border border-[#E6DED1]/60

        /* PREMIUM SHADOW */
        shadow-[0_10px_30px_rgba(0,0,0,0.12)]
        sm:shadow-[0_20px_50px_rgba(0,0,0,0.18)]

        transition-all duration-300
      "
    >
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F2933]">
          Sign in to your account
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-[#4B5563]">
          Don’t have an account?
          <Link
            className="ml-1 font-medium text-[#C9A24D] hover:text-[#B08B3C]"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      {/* FORM */}
      <CommonForm
        formControls={loginFormControls}
        buttonText={loading ? "Signing In..." : "Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={loading}
      />

      {/* GOOGLE */}
      <Button
        onClick={handleGoogleLogin}
        className="
          w-full flex items-center justify-center gap-2
          border bg-white text-black
          hover:bg-gray-100
          py-2.5 sm:py-3
        "
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          className="w-4 h-4 sm:w-5 sm:h-5"
        />
        Continue with Google
      </Button>
    </div>
  </div>
);
}

export default AuthLogin;