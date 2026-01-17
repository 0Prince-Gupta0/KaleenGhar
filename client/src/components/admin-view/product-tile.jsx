import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Pencil, Trash2 } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const isOnSale = product?.salePrice > 0;
  const isLowStock = product?.totalStock <= 5;

  return (
    <Card className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-muted bg-background transition-all duration-300 hover:shadow-lg">
      
      {/* IMAGE */}
      <div className="relative h-[260px] bg-muted overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* SALE BADGE */}
        {isOnSale && (
          <span className="absolute top-3 left-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            Sale
          </span>
        )}

        {/* STOCK BADGE */}
        {isLowStock && (
          <span className="absolute top-3 right-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-black">
            Low Stock
          </span>
        )}
      </div>

      {/* CONTENT */}
      <CardContent className="space-y-2 p-4">
        <h2 className="line-clamp-1 text-lg font-semibold">
          {product?.title}
        </h2>

        <p className="text-sm text-muted-foreground capitalize">
          {product?.category} • {product?.brand}
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span
            className={`text-base font-semibold ${
              isOnSale ? "line-through text-muted-foreground" : "text-primary"
            }`}
          >
            ₹{product?.price}
          </span>

          {isOnSale && (
            <span className="text-base font-bold text-green-600">
              ₹{product?.salePrice}
            </span>
          )}
        </div>

        {/* STOCK INFO */}
        <p className="text-xs text-muted-foreground">
          Stock: {product?.totalStock}
        </p>
      </CardContent>

      {/* ACTIONS */}
      <CardFooter className="flex justify-between gap-2 px-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2"
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
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
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
