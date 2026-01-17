import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full bg-[#FBF7F1]">
      {/* ================= SIDEBAR ================= */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* HEADER */}
        <div className="sticky top-0 z-40">
          <AdminHeader setOpen={setOpenSidebar} />
        </div>

        {/* PAGE CONTENT */}
        <main
          className="
            flex-1 overflow-y-auto
            px-4 py-6 md:px-8 md:py-8
            bg-gradient-to-br
            from-[#FFFCF7]
            via-[#FBF7F1]
            to-[#F5EFE6]
          "
        >
          {/* Content Container */}
          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
              rounded-2xl
              bg-white/80
              backdrop-blur
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
              border border-[#E6DED1]
              p-4 md:p-6
              transition-all
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
