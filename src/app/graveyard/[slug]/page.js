import { graveyardDatabase } from "@/app/constant/database";
import InfiniteGrid from "@/app/components/archive/InfiniteGrid";

// Page component ko async banayein
export default async function SingleGraveyard({ params }) {
  // params ko await karein (Next.js 15+ requirements)
  const { slug } = await params;

  const graveyardData = graveyardDatabase.filter(
    (item) => item.Graveyard.toLowerCase() === slug.toLowerCase()
  );

  return (
    <main className="py-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 capitalize">
        {slug.replace(/(\d+)/, " $1")} Records
      </h1>
      <InfiniteGrid allData={graveyardData} type="Graveyard" />
    </main>
  );
}
