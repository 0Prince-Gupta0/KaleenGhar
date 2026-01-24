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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function AdminDashboard() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { featureImageList } = useSelector(
    (state) => state.commonFeature
  );

  const [activeTab, setActiveTab] = useState("images");

  // Image upload states
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  // Hero text states
  const [hero, setHero] = useState({
    title: "",
    subtitle: "",
    description: "",
  });

  /* ================= FETCH HERO ================= */
  useEffect(() => {
    axios.get(`${BASE_URL}/api/common/hero`).then((res) => {
      if (res.data) setHero(res.data);
    });
  }, []);

  /* ================= FETCH IMAGES ================= */
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  /* ================= IMAGE UPLOAD ================= */
  const handleUploadFeatureImage = () => {
    if (!uploadedImageUrl || imageLoadingState) return;

    dispatch(addFeatureImage(uploadedImageUrl)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getFeatureImages());
        setUploadedImageUrl("");
        toast({ title: "Feature image added", variant: "success" });
      }
    });
  };

  const handleDeleteFeatureImage = (id) => {
    if (!window.confirm("Delete this image?")) return;

    dispatch(deleteFeatureImage(id)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getFeatureImages());
        toast({ title: "Feature image deleted" });
      }
    });
  };

  /* ================= SAVE HERO ================= */
  const handleSaveHero = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/common/hero`,
        hero,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast({ title: "Hero content updated", variant: "success" });
    } catch {
      toast({ title: "Only admin can update", variant: "destructive" });
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-8">

      {/* TABS */}
      <div className="flex gap-4">
        <Button
          variant={activeTab === "images" ? "default" : "outline"}
          onClick={() => setActiveTab("images")}
        >
          Feature Images
        </Button>
        <Button
          variant={activeTab === "hero" ? "default" : "outline"}
          onClick={() => setActiveTab("hero")}
        >
          Hero Content
        </Button>
      </div>

      {/* ================= FEATURE IMAGES TAB ================= */}
      {activeTab === "images" && (
        <>
          <Card className="border bg-[#FFFCF7]">
            <CardHeader>
              <CardTitle>Upload Feature Image</CardTitle>
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
                disabled={!uploadedImageUrl}
                className="w-full"
              >
                Save Feature Image
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Images</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featureImageList?.map((item) => (
                <div key={item._id} className="relative group">
                  <img
                    src={item.image}
                    className="w-full h-[260px] object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleDeleteFeatureImage(item._id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-600 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      {/* ================= HERO CONTENT TAB ================= */}
      {activeTab === "hero" && (
        <Card className="border bg-[#FFFCF7]">
          <CardHeader>
            <CardTitle>Hero Section Content</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              placeholder="Title"
              value={hero.title}
              onChange={(e) =>
                setHero({ ...hero, title: e.target.value })
              }
            />

            <Input
              placeholder="Subtitle"
              value={hero.subtitle}
              onChange={(e) =>
                setHero({ ...hero, subtitle: e.target.value })
              }
            />

            <Textarea
              placeholder="Description"
              rows={4}
              value={hero.description}
              onChange={(e) =>
                setHero({ ...hero, description: e.target.value })
              }
            />

            <Button onClick={handleSaveHero}>
              Save Hero Content
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AdminDashboard;
