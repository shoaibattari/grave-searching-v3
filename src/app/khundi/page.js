import Link from "next/link";
import { FaUsers, FaArrowRight } from "react-icons/fa";
import { graveyardDatabase } from "../constant/database";
import { SectionHeading } from "../components/ui/SectionHeading";

export default function KhundiDirectory() {
  // 1. Database se unique Khundi names nikalne ka logic
  const uniqueKhundis = [
    ...new Set(graveyardDatabase.map((item) => item.KHUNDI)),
  ]
    .filter(Boolean) // Khali values ko remove karne ke liye
    .sort(); // A to Z sort karne ke liye

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading Call */}
        <SectionHeading
          title="Khundi"
          highlight="Directory"
          subtitle={`Total ${uniqueKhundis.length} unique families found in archive`}
        />

        {/* 2. Dynamic Grid with Direct Tailwind Styles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {uniqueKhundis.map((name, index) => {
            // Har Khundi ke liye count nikalna
            const count = graveyardDatabase.filter((d) => d.KHUNDI === name)
              .length;

            return (
              <Link
                key={index}
                href={`/khundi/${name.toLowerCase()}`}
                className="group"
              >
                {/* Yahan Surface ki jagah direct div styles hain */}
                <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white border border-slate-100 rounded-[2.5rem] transition-all duration-300 group-hover:border-emerald-500 group-hover:shadow-2xl group-hover:shadow-emerald-900/10 group-hover:-translate-y-1">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <FaUsers size={24} />
                  </div>

                  {/* Name */}
                  <h3 className="md:text-xl font-bold text-slate-800 group-hover:text-emerald-900 mb-2">
                    {name}
                  </h3>

                  {/* Count Badge */}
                  <div className="mt-auto pt-4 flex flex-col items-center border-t border-slate-50 w-full">
                    <span className="text-2xl font-serif font-bold text-emerald-600">
                      {count}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Records Found
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
