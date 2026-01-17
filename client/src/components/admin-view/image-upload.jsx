import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);

    const response = await axios.post(
        `${BASE_URL}/api/admin/products/upload-image`,
      data
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div
      className={`w-full mt-6 ${
        isCustomStyling ? "" : "max-w-md mx-auto"
      }`}
    >
      <Label className="mb-2 block text-sm font-semibold text-[#1F2933]">
        Product Image
      </Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative
          rounded-2xl
          border-2 border-dashed
          p-6
          transition-all duration-300

          ${
            isEditMode
              ? "opacity-60 cursor-not-allowed"
              : "hover:border-[#C9A24D]"
          }

          ${
            imageFile
              ? "border-[#E6DED1] bg-[#FFFCF7]"
              : "border-[#E6DED1] bg-[#FFFCF7]/60"
          }
        `}
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {/* EMPTY STATE */}
        {!imageFile && !imageLoadingState && (
          <Label
            htmlFor="image-upload"
            className={`
              flex h-40 cursor-pointer flex-col items-center justify-center
              text-center
              ${
                isEditMode ? "cursor-not-allowed" : ""
              }
            `}
          >
            <div
              className="
                mb-3 rounded-full
                bg-[#F5EFE6]
                p-4
              "
            >
              <UploadCloudIcon className="h-8 w-8 text-[#C9A24D]" />
            </div>
            <p className="text-sm font-medium text-[#1F2933]">
              Drag & drop or click to upload
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">
              PNG, JPG up to 5MB
            </p>
          </Label>
        )}

        {/* LOADING STATE */}
        {imageLoadingState && (
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        )}

        {/* FILE SELECTED */}
        {imageFile && !imageLoadingState && (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#F5EFE6] p-2">
                <FileIcon className="h-6 w-6 text-[#C9A24D]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1F2933] truncate max-w-[180px]">
                  {imageFile.name}
                </p>
                <p className="text-xs text-[#6B7280]">
                  Image selected
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
              className="
                rounded-full
                hover:bg-[#F5EFE6]
                hover:text-[#1F2933]
              "
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
