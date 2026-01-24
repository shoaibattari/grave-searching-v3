import { graveyardDatabase } from "@/app/constant/database";
import InfiniteGrid from "@/app/components/archive/InfiniteGrid";
import { SectionHeading } from "@/app/components/ui/SectionHeading";

export default function GlobalArchive() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 pt-40">
      <div className="max-w-7xl mx-auto mt-4">
        {/* Page Header */}
        <SectionHeading
          title="Digital"
          highlight="Archive"
          subtitle={`Search through our complete database of ${graveyardDatabase.length} burial records`}
        />

        {/* Global Search & Multi-Filter Grid */}
        <div className="mt-10">
          {/* Yahan hum koi hideFilter pass nahi karenge taake dono dropdowns (Khundi & Graveyard) dikhai dein */}
          <InfiniteGrid allData={graveyardDatabase} />
        </div>
      </div>
    </main>
  );
}
