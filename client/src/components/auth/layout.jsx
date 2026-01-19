import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* LEFT PANEL */}
     <div
  className="hidden lg:flex w-1/2 items-center justify-center relative bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://plus.unsplash.com/premium_photo-1725456680425-2a1793ada19b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGNhcnBldHN8ZW58MHx8MHx8fDA%3D')",
  }}
>
  {/* Global soft overlay (even, no patches) */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/30 to-black/55" />

  {/* Subtle vignette for depth */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_75%)]" />

  <div className="relative max-w-md text-center px-8">
    {/* Brand Name */}
    <p
      className="
        text-4xl tracking-[0.35em] uppercase mb-3
        text-[#E0C36A]
        drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
      "
    >
      Qaleen Ghar
    </p>

    <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow-sm">
      Handcrafted Carpets
    </h1>

    <p className="mt-2 text-lg text-gray-100 drop-shadow-sm">
      Crafted for Timeless Living
    </p>

    {/* Gold divider */}
    <div className="mt-6 h-[2px] w-20 mx-auto bg-[#E0C36A]" />

    <p className="mt-4 text-sm text-gray-200 tracking-wide drop-shadow-sm">
      Heritage • Premium Quality • Trusted Craftsmanship
    </p>
  </div>
</div>


      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center bg-[#FBF7F1] px-4 py-12">

        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
