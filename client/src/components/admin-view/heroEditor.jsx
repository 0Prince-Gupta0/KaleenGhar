import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function HeroEditor() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [hero, setHero] = useState({
    title: "",
    subtitle: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  /* ================= FETCH EXISTING HERO ================= */
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/hero`)
      .then((res) => {
        if (res.data) setHero(res.data);
      })
      .catch(() => {
        toast({ title: "Failed to load hero content", variant: "destructive" });
      });
  }, []);

  /* ================= SAVE HERO ================= */
  const handleSave = async () => {
    try {
      setLoading(true);

      await axios.put(
        `${BASE_URL}/api/common/hero`,
        hero,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({ title: "Hero content updated", variant: "success" });
    } catch (err) {
      toast({
        title: "Only admins can update hero",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border p-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-6">Hero Section Content</h2>

      <div className="space-y-4">
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

        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

export default HeroEditor;
