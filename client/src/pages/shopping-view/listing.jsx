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
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";

function ShoppingListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { productList, pagination, isLoading } = useSelector(
    (state) => state.shopProducts
  );

  const { user } = useSelector((state) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const limit = 50;
  const isFirstRender = useRef(true);

  /* ================= PARSE PARAMS ================= */

  const filters = {};
  let sort = "price-lowtohigh";
  let search = "";

  searchParams.forEach((value, key) => {
    if (key === "sort") sort = value;
    else if (key === "search") search = value;
    else filters[key] = value.split(",");
  });

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  /* ================= FETCH ================= */

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: filters,
        sortParams: sort,
        search,
        page,
        limit,
      })
    );
  }, [dispatch, page, sort, search, JSON.stringify(filters)]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(1);
  }, [search, sort, JSON.stringify(filters)]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchInput) params.set("search", searchInput);
      else params.delete("search");

      setSearchParams(params);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  /* ================= HANDLERS ================= */

  const handleFilter = (section, value) => {
    const params = new URLSearchParams(searchParams);
    const current = params.get(section)?.split(",") || [];

    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    updated.length
      ? params.set(section, updated.join(","))
      : params.delete(section);

    setSearchParams(params);
  };

  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    setSearchParams(params);
  };

  /* ================= CART ================= */

  const handleAddtoCart = (product) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }

    if (product.sizes?.length > 1) {
      toast({
        title: "Please select a size",
        description: "Choose size before adding to cart",
      });

      navigate(`/shop/product/${product._id}`);
      return;
    }

    const sizeLabel = product.sizes?.[0]?.label;

    dispatch(
      addToCart({
        userId: user.id,
        productId: product._id,
        size: sizeLabel,
        quantity: 1,
      })
    ).then(() => {
      dispatch(fetchCartItems(user.id));
      toast({ title: "Product added to cart", variant: "success" });
    });
  };

  /* ================= UI ================= */

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 p-3 sm:p-4 md:p-6">

        {/* DESKTOP FILTER */}
        <div className="hidden lg:block">
          <ProductFilter
            filters={filters}
            handleFilter={handleFilter}
            clearAllFilters={clearAllFilters}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-background w-full rounded-2xl border">

          {/* 🔥 MOBILE STICKY BAR */}
          <div className="lg:hidden sticky top-0 z-40 bg-[#FBF7F1]/95 backdrop-blur border-b px-3 py-2 flex gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-full"
              onClick={() => setOpenFilter(true)}
            >
              Filters
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 rounded-full">
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

          {/* 🔍 SEARCH */}
          <div className="px-3 py-3 lg:px-5">
            <Input
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-full"
            />
          </div>

          {/* HEADER */}
          {/* HEADER */}
<div className="px-4 sm:px-6 pb-4 flex items-center justify-between gap-2">
  <h2 className="text-lg sm:text-xl font-bold">
    All Products
  </h2>

  {/* DESKTOP / TABLET SORT */}
  <div className="hidden lg:flex items-center gap-2">
    <span className="text-sm text-muted-foreground">
      Sort by:
    </span>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowUpDownIcon size={16} />
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
</div>

          {/* PRODUCTS */}
          <div className="
            grid grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-3 sm:gap-4 md:gap-6
            p-3 sm:p-4 md:p-6
          ">
            {isLoading ? (
              <p className="col-span-full text-center">
                Loading products...
              </p>
            ) : productList?.length ? (
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
            ) : (
              <p className="col-span-full text-center">
                No products found
              </p>
            )}
          </div>

          {/* PAGINATION */}
          {pagination?.totalPages > 1 && (
            <div className="flex flex-col items-center gap-3 pb-6 px-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Page {page} of {pagination.totalPages}
              </p>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Prev
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 MOBILE FILTER DRAWER */}
      <Sheet open={openFilter} onOpenChange={setOpenFilter}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
          <div className="p-4 border-b text-center font-semibold">
            Filters
          </div>

          <div className="overflow-y-auto h-full p-4">
            <ProductFilter
              filters={filters}
              handleFilter={handleFilter}
              clearAllFilters={clearAllFilters}
            />
          </div>

          <div className="p-4 border-t">
            <Button
              className="w-full rounded-full"
              onClick={() => setOpenFilter(false)}
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ShoppingListing;