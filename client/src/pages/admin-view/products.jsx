import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  gallery: [],
  title: "",
  description: "",
  category: "",
  color: "",
  shape: "",
  material: "",
  sizes: [],
  averageReview: 0,
  isFeatured: false,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  /* ================= IMAGE ADD ================= */
  useEffect(() => {
    if (uploadedImageUrl) {
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, uploadedImageUrl],
      }));
      setUploadedImageUrl("");
      setImageFile(null);
    }
  }, [uploadedImageUrl]);

  /* ================= SIZE FUNCTIONS ================= */
  const addSizeRow = () => {
    setFormData((prev) => ({
      ...prev,
      sizes: [
        ...prev.sizes,
        { label: "", price: "", salePrice: "", stock: "" },
      ],
    }));
  };

  const updateSizeRow = (index, field, value) => {
    const updated = [...formData.sizes];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, sizes: updated }));
  };

  const removeSizeRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData };

    const action = currentEditedId
      ? editProduct({ id: currentEditedId, formData: payload })
      : addNewProduct(payload);

    dispatch(action).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchAllProducts());
        resetForm();
        toast({
          title: currentEditedId
            ? "Product updated successfully"
            : "Product added successfully",
          variant: "success",
        });
      }
    });
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then(() => dispatch(fetchAllProducts()));
  };

  /* ================= VALIDATION ================= */
  const isFormValid = () => {
    const requiredFields = [
      "title",
      "description",
      "category",
      "color",
      "shape",
      "material",
    ];

    const validFields = requiredFields.every(
      (f) => formData[f]?.toString().trim() !== ""
    );

    const hasGallery = formData.gallery.length > 0;

    const hasSizes =
      formData.sizes.length > 0 &&
      formData.sizes.every(
        (s) => s.label && s.price !== "" && s.stock !== ""
      );

    return validFields && hasGallery && hasSizes;
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl("");
    setCurrentEditedId(null);
    setOpenCreateProductsDialog(false);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList?.map((product) => (
          <AdminProductTile
            key={product._id}
            product={product}
            handleDelete={handleDelete}
            setFormData={(data) => {
              setFormData({
                ...data,
                gallery: data.gallery || [],
              });
            }}
            setCurrentEditedId={setCurrentEditedId}
            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
          />
        ))}
      </div>

      <Sheet open={openCreateProductsDialog} onOpenChange={resetForm}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Product" : "Add Product"}
            </SheetTitle>
          </SheetHeader>

          {/* IMAGE */}
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={Boolean(currentEditedId)}
          />

          {/* 🔥 GALLERY WITH REMOVE */}
          <div className="flex gap-3 flex-wrap mt-3">
            {formData.gallery.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img}
                  className="w-20 h-20 rounded object-cover border"
                />

                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      gallery: prev.gallery.filter((_, index) => index !== i),
                    }));
                  }}
                  className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              hideSubmit
            />
          </div>

          {/* SIZES */}
          <div className="border rounded-xl p-4 bg-muted/30 space-y-3 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Sizes & Pricing</h3>

              <Button size="sm" variant="outline" onClick={addSizeRow}>
                + Add Size
              </Button>
            </div>

            <div className="grid grid-cols-[1fr_1fr_1fr_0.8fr_auto] text-xs font-medium text-muted-foreground px-1">
              <span>Size</span>
              <span>Price</span>
              <span>Sale</span>
              <span>Stock</span>
              <span></span>
            </div>

            <div className="border-b" />

            {formData.sizes.length === 0 && (
              <p className="text-sm text-muted-foreground py-2">
                No sizes added yet.
              </p>
            )}

            <div className="space-y-2">
              {formData.sizes.map((size, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_1fr_1fr_0.8fr_auto] items-center"
                >
                  <input
                    className="border p-2 rounded-md bg-white w-full"
                    value={size.label}
                    onChange={(e) =>
                      updateSizeRow(index, "label", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    className="border p-2 rounded-md bg-white w-full"
                    value={size.price}
                    onChange={(e) =>
                      updateSizeRow(index, "price", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    className="border p-2 rounded-md bg-white w-full"
                    value={size.salePrice || ""}
                    onChange={(e) =>
                      updateSizeRow(index, "salePrice", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    className="border p-2 rounded-md bg-white w-full"
                    value={size.stock}
                    onChange={(e) =>
                      updateSizeRow(index, "stock", e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => removeSizeRow(index)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <div className="sticky bottom-0 pt-4 bg-background">
            <Button
              className="w-full h-11"
              disabled={!isFormValid()}
              onClick={handleSubmit}
            >
              {currentEditedId ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;