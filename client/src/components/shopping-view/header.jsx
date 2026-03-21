import {
  LogOut,
  Menu,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import UserCartWrapper from "./cart-wrapper";
import { shoppingViewHeaderMenuItems, filterOptions } from "@/config";

/* ================= MENU ================= */

function MenuItems({ closeSheet }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const applyFilter = (key, value) => {
    sessionStorage.setItem("filters", JSON.stringify({ [key]: [value] }));
    navigate(`/shop/listing?${key}=${value}`);
    setOpenMenu(null);
    closeSheet?.();
  };

 return (
  <nav className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
    {shoppingViewHeaderMenuItems.map((item) => {
      const options = filterOptions[item.id];

      if (!options) {
        return (
          <div
            key={item.id}
            onClick={() => {
              navigate(item.path);
              closeSheet?.();
            }}
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#F5EFE6] cursor-pointer"
          >
            {item.label}
          </div>
        );
      }

      return (
        <div key={item.id} className="relative group">
          
          {/* TITLE */}
          <div
            onClick={() =>
              setOpenMenu(openMenu === item.id ? null : item.id)
            }
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#F5EFE6] hover:text-[#C9A24D] cursor-pointer lg:hover:bg-transparent"
          >
            {item.label}
          </div>

          {/* ================= MOBILE ================= */}
          {openMenu === item.id && (
            <div className="ml-4 mt-2 border-l pl-3 flex flex-col gap-1 lg:hidden">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => applyFilter(item.id, opt.id)}
                  className="text-sm py-1 cursor-pointer hover:text-[#C9A24D]"
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}

          {/* ================= DESKTOP ================= */}
          <div
  className="
    hidden lg:block
    absolute left-0 top-[calc(100%+10px)]
    w-56
    bg-white
    border border-[#E8E2D9]
    rounded-2xl
    shadow-[0_10px_30px_rgba(0,0,0,0.08)]
    opacity-0 invisible translate-y-2
    group-hover:opacity-100
    group-hover:visible
    group-hover:translate-y-0
    transition-all duration-300 ease-out
    z-50
  "
>
  {options.map((opt) => (
    <div
      key={opt.id}
      onClick={() => applyFilter(item.id, opt.id)}
      className="
        px-5 py-3
        text-sm font-medium
        cursor-pointer
        transition
        hover:bg-[#F8F4EC]
        hover:text-[#C9A24D]
        first:rounded-t-2xl
        last:rounded-b-2xl
      "
    >
      {opt.label}
    </div>
  ))}
</div>

        </div>
      );
    })}
  </nav>
);
}

/* ================= HEADER RIGHT ================= */

function HeaderRightContent({
  openCart,
  setOpenCart,
  closeMenu,
  isMobile = false,
}) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [user, dispatch]);

  // ✅ auto close cart on route change
  useEffect(() => {
    setOpenCart(false);
  }, [location.pathname]);

  const cartCount = cartItems?.length || 0;

  return (
    <div className={`flex items-center gap-4 ${isMobile ? "w-full justify-between" : ""}`}>
      {/* CART */}
      {user && (
        <Sheet open={openCart} onOpenChange={setOpenCart}>
          <Button
            variant="ghost"
            onClick={() => {
              setOpenCart(true);
              closeMenu?.(); // ✅ close hamburger
            }}
            className="relative"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C9A24D] text-black text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Button>

          <UserCartWrapper
            cartItems={cartItems || []}
            setOpenCartSheet={setOpenCart}
            closeMenu={closeMenu} // ✅ pass down
          />
        </Sheet>
      )}

      {/* PROFILE */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2">
            <Avatar className="h-9 w-9 bg-black">
              <AvatarFallback className="text-white">
                {user?.userName?.[0]?.toUpperCase() ?? "G"}
              </AvatarFallback>
            </Avatar>

            {!isMobile && (
              <span className="text-sm">
                {user ? user.userName : "Guest"}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>
<DropdownMenuContent
  align="end"
  className="w-64 rounded-xl shadow-xl border bg-white p-0 overflow-hidden"
>
  {user ? (
    <>
      {/* HEADER */}
      <div className="px-4 py-3 border-b">
        <p className="text-xs text-gray-500">Signed in as</p>
        <p className="font-semibold truncate">
          {user?.userName || user?.name}
        </p>
      </div>

      {/* OPTIONS */}
      <DropdownMenuItem
        onClick={() => {
          closeMenu?.();
          navigate("/shop/account");
        }}
        className="cursor-pointer"
      >
        My Account
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => dispatch(logoutUser())}
        className="text-red-600 cursor-pointer"
      >
        Logout
      </DropdownMenuItem>
    </>




  ) : (
    <>
      {/* HEADER */}
      <div className="px-4 py-3 border-b">
        <p className="text-xs text-gray-500">Welcome</p>
        <p className="text-sm font-semibold">
          Sign in to continue
        </p>
      </div>

      {/* BUTTONS */}
      <div className="p-3 space-y-2">
        <button
          onClick={() => {
            closeMenu?.();
            navigate("/auth/login");
          }}
          className="w-full bg-[#C9A24D] text-black py-2 rounded-md font-medium hover:opacity-90 transition"
        >
          Login
        </button>

        <button
          onClick={() => {
            closeMenu?.();
            navigate("/auth/register");
          }}
          className="w-full border py-2 rounded-md hover:bg-gray-50 transition"
        >
          Create Account
        </button>
      </div>
    </>
  )}
</DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/* ================= HEADER ================= */

export default function ShoppingHeader() {
  const [openSheet, setOpenSheet] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFFCF7] border-b">
      <div className="h-16 px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/shop/home" className="font-bold tracking-widest text-[#C9A24D]">
          QALEEN GHAR
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden lg:block">
          <HeaderRightContent
            openCart={openCart}
            setOpenCart={setOpenCart}
            closeMenu={() => setOpenSheet(false)}
          />
        </div>

        {/* MOBILE */}
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpenSheet(true)}
            >
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[300px] p-0 bg-[#FFFCF7] flex flex-col h-full">
            {/* HEADER */}
            <div className="px-5 py-4 border-b font-bold text-[#C9A24D]">
              QALEEN GHAR
            </div>

            {/* MENU */}
            <div className="flex-1 overflow-y-auto p-5">
              <MenuItems closeSheet={() => setOpenSheet(false)} />
            </div>

            {/* FOOTER */}
            <div className="border-t p-4">
              <HeaderRightContent
                isMobile
                openCart={openCart}
                setOpenCart={setOpenCart}
                closeMenu={() => setOpenSheet(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}