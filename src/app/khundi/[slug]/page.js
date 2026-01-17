import InfiniteGrid from "@/app/components/archive/InfiniteGrid";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { graveyardDatabase } from "@/app/constant/database";

export default async function SingleKhundi({ params }) {
  // Params ko await karna Next.js 15 ki requirement hai
  const { slug } = await params;

  // Data filter logic with optional chaining for safety
  const khundiData = graveyardDatabase.filter(
    (d) => d.KHUNDI?.toLowerCase() === slug?.toLowerCase()
  );

  return (
    <main className="py-20 px-4 max-w-7xl mx-auto min-h-screen bg-white">
      {/* 1. Aapka banaya hua SectionHeading yahan use karein */}
      <SectionHeading
        title="Khundi:"
        highlight={slug?.toUpperCase()}
        subtitle={`${khundiData.length} Digital Records Found`}
        align="left"
      />

      {/* 2. Infinite Scroll Grid */}
      <div className="mt-10">
        <InfiniteGrid allData={khundiData} type="Khundi" />
      </div>

      {/* 3. Handling No Data */}
      {khundiData.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[3rem]">
          <p className="text-slate-400 font-medium italic">
            No records found for the family name "{slug}".
          </p>
        </div>
      )}
    </main>
  );
}
