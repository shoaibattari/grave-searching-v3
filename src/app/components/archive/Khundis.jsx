"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { graveyardDatabase } from "@/app/constant/database";

export default function Khundis() {
  // 1. Database se unique Khundi names aur unka count nikalna
  const khundiData = useMemo(() => {
    const stats = {};

    graveyardDatabase.forEach((item) => {
      const name = item.KHUNDI;
      if (name) {
        stats[name] = (stats[name] || 0) + 1;
      }
    });

    // Object ko array mein convert karke sort karna (Zyada records wali Khundis upar ayen ya A-Z)
    return Object.entries(stats)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count) // Filhaal zyada records wali top par hain
      .slice(0, 8); // Home page ke liye sirf top 8 dikhayenge
  }, []);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {khundiData.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <Link href={`/khundi/${item.name.toLowerCase()}`}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:border-emerald-500 hover:bg-white hover:shadow-lg hover:shadow-emerald-900/5 transition-all text-center group">
                <span className="text-[9px] font-black text-slate-400 group-hover:text-emerald-500 uppercase tracking-widest">
                  Khundi
                </span>
                <h3 className="font-bold text-slate-800 my-1 group-hover:text-emerald-700 transition-colors">
                  {item.name}
                </h3>
                <div className="text-emerald-600 font-serif font-bold italic text-sm">
                  {item.count}{" "}
                  <span className="text-[9px] not-italic text-slate-400">
                    Records
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/khundi"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors uppercase tracking-widest group"
        >
          View All Khundis
          <span className="text-lg group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
