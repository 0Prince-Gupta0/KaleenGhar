import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const { featureImageList } = useSelector(
    (state) => state.commonFeature
  );

  /* ================= UPLOAD ================= */
  function handleUploadFeatureImage() {
    if (!uploadedImageUrl || imageLoadingState) return;

    dispatch(addFeatureImage(uploadedImageUrl)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast({ title: "Feature image added" , variant: "success",});
      }
    });
  }

  /* ================= DELETE ================= */
  function handleDeleteFeatureImage(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feature image?"
    );
    if (!confirmDelete) return;

    dispatch(deleteFeatureImage(id)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getFeatureImages());
        toast({ title: "Feature image deleted" , variant: "destructive", });
      }
    });
  }

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  /* ================= UI ================= */
  return (
    <div className="space-y-8">
      {/* ================= UPLOAD CARD ================= */}
      <Card className="border border-[#E6DED1] bg-[#FFFCF7] rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl text-[#1F2933]">
            Upload Feature Image
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isCustomStyling
          />

          <Button
            onClick={handleUploadFeatureImage}
            disabled={!uploadedImageUrl || imageLoadingState}
            className="w-full bg-[#1F2933] text-white hover:bg-black"
          >
            {imageLoadingState ? "Uploading..." : "Save Feature Image"}
          </Button>
        </CardContent>
      </Card>

      {/* ================= FEATURE IMAGES ================= */}
      <Card className="border border-[#E6DED1] bg-[#FFFCF7] rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl text-[#1F2933]">
            Feature Images
          </CardTitle>
        </CardHeader>

        <CardContent>
          {featureImageList && featureImageList.length > 0 ? (
            <div className="grid gap-6">
              {featureImageList.map((item) => (
                <div
                  key={item._id}
                  className="
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#E6DED1]
                    group
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt="Feature banner"
                    className="
                      w-full
                      h-[300px]
                      object-cover
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() =>
                      handleDeleteFeatureImage(item._id)
                    }
                    className="
                      absolute
                      top-3
                      right-3
                      bg-white/90
                      hover:bg-red-50
                      border
                      border-red-200
                      text-red-600
                      rounded-full
                      p-2
                      opacity-0
                      group-hover:opacity-100
                      transition
                    "
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">
              No feature images uploaded yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
