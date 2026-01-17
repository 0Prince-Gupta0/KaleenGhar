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
  image: "",
  title: "",
  description: "",
  category: "",
  color: "",
  size: "",
  shape: "",
  material: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
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

  /* ================= SUBMIT ================= */
  function onSubmit(event) {
    event.preventDefault();

    const payload = {
      ...formData,
      image: uploadedImageUrl || formData.image,
    };
// console.log("SUBMIT PAYLOAD 👉", payload);
    if (currentEditedId) {
      dispatch(editProduct({ id: currentEditedId, formData: payload }))
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            resetForm();
            toast({ title: "Product updated successfully", variant: "success", });
          }
        });
    } else {
      dispatch(addNewProduct(payload)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          resetForm();
          toast({ title: "Product added successfully" , variant: "success",});
        }
      });
    }
  }

  /* ================= DELETE ================= */
  function handleDelete(productId) {
    dispatch(deleteProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  /* ================= VALIDATION ================= */
  function isFormValid() {
    const requiredFields = [
      "title",
      "description",
      "category",
      "color",
      "size",
      "shape",
      "material",
      "price",
      "totalStock",
    ];

    const areFieldsValid = requiredFields.every(
      (field) => formData[field]?.toString().trim() !== ""
    );

    const isImageValid = Boolean(uploadedImageUrl || formData.image);

    return areFieldsValid && isImageValid;
  }

  /* ================= RESET ================= */
  function resetForm() {
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl("");
    setCurrentEditedId(null);
    setOpenCreateProductsDialog(false);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
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
            setFormData={setFormData}
            setUploadedImageUrl={setUploadedImageUrl}
            setCurrentEditedId={setCurrentEditedId}
            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
          />
        ))}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={resetForm}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={Boolean(currentEditedId)}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditedId ? "Edit" : "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
