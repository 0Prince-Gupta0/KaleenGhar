import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";



function ShoppingListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { productList, isLoading } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();

  /* ================= DERIVE FILTERS & SORT FROM URL ================= */
  


  const filters = {};
let sort = "price-lowtohigh";
let search = "";

searchParams.forEach((value, key) => {
  if (key === "sort") {
    sort = value;
  } else if (key === "search") {
    search = value;
  } else {
    filters[key] = value.split(",");
  }
});


  /* ================= FETCH PRODUCTS (URL = SOURCE OF TRUTH) ================= */
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: filters,
        sortParams: sort,
        search
      })
    );
  }, [searchParams, dispatch]);

  /* ================= FILTER CLICK ================= */
  function handleFilter(section, value) {
    const params = new URLSearchParams(searchParams);
    const current = params.get(section)?.split(",") || [];

    let updated;
    if (current.includes(value)) {
      updated = current.filter((v) => v !== value);
    } else {
      updated = [...current, value];
    }

    if (updated.length) {
      params.set(section, updated.join(","));
    } else {
      params.delete(section);
    }

    setSearchParams(params);
  }

  /* ================= SORT CHANGE ================= */
  function handleSortChange(value) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    setSearchParams(params);
  }

  /* ================= ADD TO CART ================= */
  function handleAddtoCart(productId, totalStock) {
    if (!user) {
  toast({
    title: "Login required",
    description: "Please login to add items to your cart",
    variant: "destructive",
  });
  navigate("/auth/login");
  return;
}

    const items = cartItems?.items || [];
    const existing = items.find((i) => i.productId === productId);

    if (existing && existing.quantity + 1 > totalStock) {
      toast({
        title: `Only ${existing.quantity} quantity can be added`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart" , variant: "success",});
      }
    });
  }
  function handleSearch(value) {
  const params = new URLSearchParams(searchParams);

  if (value.trim()) {
    params.set("search", value);
  } else {
    params.delete("search");
  }

  setSearchParams(params);
}

function clearAllFilters() {
  const params = new URLSearchParams(searchParams);

  // Remove only filter keys
  Object.keys(filters).forEach((key) => {
    params.delete(key);
  });

  setSearchParams(params);
}


  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 p-6">
      
      <ProductFilter filters={filters} handleFilter={handleFilter}  clearAllFilters={clearAllFilters}/>

      <div className="bg-background w-full rounded-2xl border">
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">All Products</h2>
          <Input
  placeholder="Search products..."
  defaultValue={searchParams.get("search") || ""}
  onChange={(e) => handleSearch(e.target.value)}
  className="max-w-sm mr-4"
/>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ArrowUpDownIcon className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={sort}
                onValueChange={handleSortChange}
              >
                {sortOptions.map((opt) => (
                  <DropdownMenuRadioItem key={opt.id} value={opt.id}>
                    {opt.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {productList?.length ? (
            productList.map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleAddtoCart={handleAddtoCart}
                onClick={() =>
                  navigate(`/shop/product/${product._id}`)
                }
              />
            ))
          ) : isLoading ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
