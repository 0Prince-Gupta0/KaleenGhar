import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function AdminFeatures() {
  return (
    <div className="space-y-6">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#1F2933]">
          Features Management
        </h1>

        <Button className="gap-2 bg-[#1F2933] hover:bg-black">
          <Plus size={18} />
          Add Feature
        </Button>
      </div>

      {/* ================= FEATURES GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* FEATURE CARD (STATIC FOR NOW) */}
        <Card className="rounded-2xl border border-[#E6DED1] bg-[#FFFCF7]">
          <CardHeader>
            <CardTitle className="text-lg text-[#1F2933]">
              Homepage Banner
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-[#6B7280]">
              Controls hero banners shown on the homepage carousel.
            </p>

            <Button variant="outline" className="w-full">
              Manage
            </Button>
          </CardContent>
        </Card>

        {/* EMPTY STATE CARD */}
        <Card className="rounded-2xl border-dashed border-2 border-[#E6DED1] bg-[#FFFCF7] flex items-center justify-center min-h-[180px]">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              More features coming soon
            </p>
            <Button variant="outline" size="sm">
              Create New Feature
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AdminFeatures;
