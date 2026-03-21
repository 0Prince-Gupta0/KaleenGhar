import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">

      {/* ================= LEFT PANEL ================= */}
      <div
        className="
          relative
          w-full
          h-[220px] sm:h-[260px] md:h-[300px]
          lg:h-auto lg:w-1/2
          flex items-center justify-center
          bg-cover bg-center
        "
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1725456680425-2a1793ada19b?w=600&auto=format&fit=crop&q=60')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60" />

        {/* Vignette (lighter on mobile) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_80%)] lg:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_75%)]" />

        {/* CONTENT */}
        <div className="relative text-center px-4 sm:px-6 md:px-8 max-w-md">
          
          {/* BRAND */}
          <p
            className="
              text-xl sm:text-2xl md:text-3xl lg:text-4xl
              tracking-[0.3em] uppercase mb-2 sm:mb-3
              text-[#E0C36A]
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
            "
          >
            Qaleen Ghar
          </p>

          {/* TITLE */}
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white tracking-wide">
            Handcrafted Carpets
          </h1>

          {/* SUBTITLE */}
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-gray-100">
            Crafted for Timeless Living
          </p>

          {/* DIVIDER */}
          <div className="mt-3 sm:mt-4 lg:mt-6 h-[2px] w-14 sm:w-16 lg:w-20 mx-auto bg-[#E0C36A]" />

          {/* TAGLINE */}
          <p className="mt-2 sm:mt-3 lg:mt-4 text-[10px] sm:text-xs md:text-sm text-gray-200 tracking-wide">
            Heritage • Premium Quality • Trusted Craftsmanship
          </p>
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div
  className="
    flex flex-1

    /* MOBILE → TOP ALIGN */
    items-start

    /* DESKTOP → CENTER */
    lg:items-center

    justify-center
    bg-[#FBF7F1]

    px-4 sm:px-6 md:px-8
    py-6 sm:py-8 md:py-10 lg:py-12
  "
>
  <div className="w-full max-w-md">
    <Outlet />
  </div>
</div>
   
    </div>
  );
}

export default AuthLayout;