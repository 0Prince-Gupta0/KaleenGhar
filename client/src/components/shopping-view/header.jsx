import {
  LogOut,
  Menu,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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

function MenuItems() {
  const navigate = useNavigate();

  const applyFilter = (key, value) => {
    sessionStorage.setItem("filters", JSON.stringify({ [key]: [value] }));
    navigate(`/shop/listing?${key}=${value}`);
  };

  return (
    <nav className="flex items-center gap-8">
      {shoppingViewHeaderMenuItems.map((item) => {
        const options = filterOptions[item.id];

        if (!options) {
          return (
            <span
              key={item.id}
              onClick={() => navigate(item.path)}
              className="cursor-pointer text-sm font-medium hover:text-[#C9A24D]"
            >
              {item.label}
            </span>
          );
        }

        return (
          <div key={item.id} className="relative group">
            {/* MENU TITLE */}
            <span className="cursor-pointer text-sm font-medium hover:text-[#C9A24D]">
              {item.label}
            </span>

            {/* HOVER BRIDGE (IMPORTANT FIX) */}
            <div className="absolute left-0 top-full h-2 w-full" />

            {/* DROPDOWN */}
           <div
  className="
    absolute left-0 top-[calc(100%+6px)]
    w-52
    bg-white
    border
    rounded-xl
    shadow-lg
    opacity-0
    invisible
    group-hover:opacity-100
    group-hover:visible
    transition-all
    duration-200
    z-50
  "
>

              {options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => applyFilter(item.id, opt.id)}
                  className="
                    px-4 py-2
                    text-sm
                    cursor-pointer
                    hover:bg-[#F5EFE6]
                    hover:rounded-xl
                    whitespace-nowrap
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

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [user, dispatch]);

  const cartCount = cartItems?.items?.length || 0;

  return (
    <div className="flex items-center gap-4">

      {/* CART */}
      {user && (
        <Sheet open={openCart} onOpenChange={setOpenCart}>
          <Button
            variant="ghost"
            onClick={() => setOpenCart(true)}
            className="relative hover:bg-[#F5EFE6]"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C9A24D] text-black text-xs font-bold px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Button>

          <UserCartWrapper
            cartItems={cartItems?.items || []}
            setOpenCartSheet={setOpenCart}
          />
        </Sheet>
      )}

      {/* PROFILE */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-[#F5EFE6]">
            <Avatar className="h-9 w-9 bg-black">
              <AvatarFallback className="text-white font-semibold">
                {user ? user.userName[0].toUpperCase() : "G"}
              </AvatarFallback>
            </Avatar>

            <span className="hidden md:block text-sm font-medium">
              {user ? user.userName : "Guest"}
            </span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64 rounded-xl shadow-xl border bg-white"
        >
          {user ? (
            <>
              <div className="px-4 py-3 border-b">
                <p className="text-xs text-gray-500">Signed in as</p>
                <p className="font-semibold truncate">{user.userName}</p>
              </div>

              <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                <User className="mr-2 h-4 w-4" />
                My Account
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => dispatch(logoutUser())}
                className="text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <div className="px-4 py-3 border-b">
                <p className="text-xs text-gray-500">Welcome</p>
                <p className="text-sm font-semibold">Sign in to continue</p>
              </div>

              <div className="p-2 space-y-2">
                <DropdownMenuItem
                  onClick={() => navigate("/auth/login")}
                  className="justify-center bg-[#C9A24D] text-black font-medium rounded-md"
                >
                  Login
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/auth/register")}
                  className="justify-center border rounded-md"
                >
                  Create Account
                </DropdownMenuItem>
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
  return (
    <header className="sticky top-0 z-50 bg-[#FFFCF7] border-b">
      <div className="h-16 px-6 flex items-center justify-between">

        <Link
          to="/shop/home"
          className="font-bold tracking-widest text-[#C9A24D]"
        >
          QALEEN GHAR
        </Link>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>

        {/* MOBILE */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <MenuItems />
            <div className="mt-6">
              <HeaderRightContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
