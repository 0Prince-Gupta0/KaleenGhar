import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Pencil, Trash2 } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const sizes = product?.sizes || [];

  // lowest price
  const minPrice =
    sizes.length > 0 ? Math.min(...sizes.map((s) => Number(s.price))) : 0;

  // badges
  const hasSale = sizes.some((s) => s.salePrice && s.salePrice > 0);
  const isLowStock = sizes.some((s) => Number(s.stock) <= 5);

  return (
    <Card className="flex flex-col h-[520px] w-full max-w-sm overflow-hidden rounded-2xl border bg-background transition hover:shadow-lg">
      
      {/* IMAGE */}
      <div className="relative h-[240px] shrink-0 overflow-hidden">
        <img
          src={product?.gallery?.[0] || "/placeholder.png"}
          alt={product?.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {hasSale && (
          <span className="absolute top-3 left-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            Sale
          </span>
        )}

        {isLowStock && (
          <span className="absolute top-3 right-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-black">
            Low Stock
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-4">
        <h2 className="line-clamp-1 text-lg font-semibold">
          {product?.title}
        </h2>

        <p className="text-sm text-muted-foreground capitalize">
          {product?.category} • {product?.material}
        </p>

        <div className="text-base font-semibold text-primary mt-1">
          Starting from ₹{minPrice}
        </div>

        {/* SCROLLABLE SIZES */}
        <div className="relative mt-3 flex-1">
          <div className="space-y-1 max-h-[96px] overflow-y-auto pr-2">
            {sizes.map((size, idx) => (
              <div
                key={idx}
                className="flex justify-between text-sm border-b pb-1"
              >
                <span className="font-medium">{size.label}</span>

                <div className="flex gap-2">
                  {size.salePrice > 0 ? (
                    <>
                      <span className="line-through text-muted-foreground">
                        ₹{size.price}
                      </span>
                      <span className="font-semibold text-green-600">
                        ₹{size.salePrice}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold">₹{size.price}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          </div>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t bg-background mt-auto">
        <div className="flex gap-2 px-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);

              setFormData({
                ...product,
                sizes: (product?.sizes || []).map((s) => ({
                  label: s.label || "",
                  price: s.price || "",
                  salePrice: s.salePrice || "",
                  stock: s.stock || "",
                })),
              });
            }}
          >
            <Pencil size={16} />
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => handleDelete(product?._id)}
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default AdminProductTile;