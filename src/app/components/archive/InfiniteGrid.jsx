"use client";
import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation"; // Pathname check karne ke liye
import GraveCard from "./GraveCard";
import { useInView } from "react-intersection-observer";

export default function InfiniteGrid({ allData }) {
  const pathname = usePathname(); // Current URL leta hai

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGraveyard, setSelectedGraveyard] = useState("All");
  const [selectedKhundi, setSelectedKhundi] = useState("All");
  const [displayCount, setDisplayCount] = useState(20);
  const { ref, inView } = useInView();

  // Route Detection Flags
  const isKhundiPage = pathname.includes("/khundi/");
  const isGraveyardPage = pathname.includes("/graveyard/");

  // 1. Dynamic Dropdown Options
  const dropdownOptions = useMemo(() => {
    return {
      graveyards: ["All", ...new Set(allData.map((d) => d.Graveyard))].filter(
        Boolean
      ),
      khundis: ["All", ...new Set(allData.map((d) => d.KHUNDI))]
        .filter(Boolean)
        .sort(),
    };
  }, [allData]);

  // 2. Multi-Filter Logic
  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchesSearch =
        item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.GraveNo.toString().includes(searchTerm);

      const matchesGraveyard =
        selectedGraveyard === "All" || item.Graveyard === selectedGraveyard;

      const matchesKhundi =
        selectedKhundi === "All" || item.KHUNDI === selectedKhundi;

      return matchesSearch && matchesGraveyard && matchesKhundi;
    });
  }, [searchTerm, selectedGraveyard, selectedKhundi, allData]);

  // Infinite Scroll Observer
  useEffect(() => {
    if (inView && displayCount < filteredData.length) {
      setDisplayCount((prev) => prev + 20);
    }
  }, [inView, filteredData.length, displayCount]);

  return (
    <div className="space-y-8">
      {/* --- Filter Bar Section --- */}
      <div className="sticky top-4 z-40 bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Name/No Search (Zyada space leta hai) */}
          <div
            className={`relative ${
              isKhundiPage || isGraveyardPage
                ? "md:col-span-8"
                : "md:col-span-4"
            }`}
          >
            <input
              type="text"
              placeholder="Search Name or Grave No..."
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setDisplayCount(20);
              }}
            />
          </div>

          {/* Graveyard Dropdown (Chhup jayega agar graveyard page par hain) */}
          {!isGraveyardPage && (
            <div className="md:col-span-4">
              <select
                value={selectedGraveyard}
                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none text-sm cursor-pointer appearance-none"
                onChange={(e) => {
                  setSelectedGraveyard(e.target.value);
                  setDisplayCount(20);
                }}
              >
                <option value="All">All Graveyards</option>
                {dropdownOptions.graveyards
                  .filter((g) => g !== "All")
                  .map((g) => (
                    <option key={g} value={g}>
                      {g.toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Khundi Dropdown (Chhup jayega agar khundi page par hain) */}
          {!isKhundiPage && (
            <div className="md:col-span-4">
              <select
                value={selectedKhundi}
                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none text-sm cursor-pointer appearance-none"
                onChange={(e) => {
                  setSelectedKhundi(e.target.value);
                  setDisplayCount(20);
                }}
              >
                <option value="All">All Khundis (Khundi)</option>
                {dropdownOptions.khundis
                  .filter((k) => k !== "All")
                  .map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="mt-4 px-2 flex justify-between items-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Showing {Math.min(displayCount, filteredData.length)} of{" "}
            {filteredData.length} Records
          </span>
          {(searchTerm ||
            selectedGraveyard !== "All" ||
            selectedKhundi !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedGraveyard("All");
                setSelectedKhundi("All");
                setDisplayCount(20);
              }}
              className="text-[10px] font-bold text-emerald-600 uppercase hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* --- Results Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.slice(0, displayCount).map((grave) => (
          <GraveCard key={grave.Id} grave={grave} />
        ))}
      </div>

      {/* No Results */}
      {filteredData.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
          <p className="text-slate-400 italic">No records match your search.</p>
        </div>
      )}

      <div ref={ref} className="h-10" />
    </div>
  );
}
