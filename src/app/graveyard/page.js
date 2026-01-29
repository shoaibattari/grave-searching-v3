import Link from "next/link";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { graveyardDatabase } from "../constant/database";
import { SectionHeading } from "../components/ui/SectionHeading";
import CountUp from "../components/ui/CountUp";

export default function GraveyardDirectory() {
  // 1. Database se unique Graveyard names nikalne ka logic
  const uniqueGraveyards = [
    ...new Set(graveyardDatabase.map((item) => item.Graveyard)),
  ]
    .filter(Boolean) // Undefined ya null values ko hatane ke liye
    .sort(); // Alphabetical order (A-Z)

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4 pt-40">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title="Graveyard"
          highlight="Directory"
          subtitle={`Exploring records across ${uniqueGraveyards.length} Graveyard sites`}
        />

        {/* 2. Dynamic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:mt-12">
          {uniqueGraveyards.map((locName, index) => {
            // Har Graveyard ke liye records count karna
            const count = graveyardDatabase.filter(
              (d) => d.Graveyard === locName
            ).length;

            // Display name ko format karna (e.g., "hubriver1" -> "HUB RIVER 1")
            const formattedName = locName
              .replace(/([a-z])(\d)/gi, "$1 $2")
              .toUpperCase();

            return (
              <Link
                key={index}
                href={`/graveyard/${locName.toLowerCase()}`}
                className="group"
              >
                <div className="h-full flex flex-col items-center justify-center p-4 md:p-8 text-center bg-white border border-slate-100 rounded-3xl md:rounded-[2.5rem] transition-all duration-300 group-hover:border-emerald-500 group-hover:shadow-2xl group-hover:shadow-emerald-900/10 group-hover:-translate-y-1">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <FaMapMarkerAlt size={24} />
                  </div>

                  {/* Location Name */}
                  <h3 className="md:text-xl font-bold text-slate-800 group-hover:text-emerald-900 mt-4 md:mt-0 md:mb-2">
                    {formattedName}
                  </h3>

                  {/* Count Badge */}
                  <div className="mt-auto md:pt-4 flex flex-col items-center border-t border-slate-50 w-full">
                    <span className="text-2xl font-serif font-bold text-emerald-600">
                      <CountUp to={count} />
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Total Graves
                    </span>
                  </div>

                  {/* Arrow hint */}
                  <div className="mt-6 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
