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

  /* sync search input */
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

  /* Reset page when filters change */
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

    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  }, 400); // delay in ms

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

  // If product has sizes
  if (product.sizes?.length > 1) {
    toast({
      title: "Please select a size",
      description: "Choose size before adding to cart",
    });

    navigate(`/shop/product/${product._id}`);
    return;
  }

  // If only one size → auto add
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
    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 p-6">
      
      <ProductFilter
        filters={filters}
        handleFilter={handleFilter}
        clearAllFilters={clearAllFilters}
      />

      <div className="bg-background w-full rounded-2xl border">

        {/* HEADER */}
        <div className="p-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold">All Products</h2>

          <div className="flex gap-3 w-full md:w-auto">
            <Input
  placeholder="Search products..."
  value={searchInput}
  onChange={(e) => setSearchInput(e.target.value)}
  className="md:w-[240px]"
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
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {isLoading ? (
            <p className="col-span-full text-center">Loading products...</p>
          ) : productList?.length ? (
            productList.map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleAddtoCart={handleAddtoCart}
                onClick={() => navigate(`/shop/product/${product._id}`)}
              />
            ))
          ) : (
            <p className="col-span-full text-center">No products found</p>
          )}
        </div>

        {/* PAGINATION */}
        {pagination?.totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 pb-6">
            <p className="text-sm text-muted-foreground">
              Page <span className="font-medium">{page}</span> of{" "}
              <span className="font-medium">{pagination.totalPages}</span>
            </p>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Previous
              </Button>

              {[...Array(pagination.totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                if (
                  pageNumber === 1 ||
                  pageNumber === pagination.totalPages ||
                  Math.abs(pageNumber - page) <= 1
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`px-3 py-1 rounded-md text-sm border ${
                        page === pageNumber
                          ? "bg-primary text-white border-primary"
                          : "bg-background hover:bg-muted"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }

                if (
                  (pageNumber === page - 2 && page > 3) ||
                  (pageNumber === page + 2 &&
                    page < pagination.totalPages - 2)
                ) {
                  return (
                    <span key={pageNumber} className="px-2 text-muted-foreground">
                      ...
                    </span>
                  );
                }

                return null;
              })}

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
  );
}

export default ShoppingListing;