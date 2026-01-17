"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
import { graveyardDatabase } from "../constant/database";

export default function Graveyards() {
  // 1. Database se unique Graveyard names nikalna
  const dynamicLocations = useMemo(() => {
    // Unique names ka set banana
    const uniqueNames = [
      ...new Set(graveyardDatabase.map((item) => item.Graveyard)),
    ].filter(Boolean);

    // Unhe objects mein convert karna taake UI handle ho sake
    return uniqueNames.map((name) => ({
      id: name,
      slug: name.toLowerCase(),
      // Display name ko sundar banana (e.g. "hubriver1" -> "Hub River 1")
      displayName: name.replace(/([a-zA-Z]+)(\d+)/, "$1 $2").replace(/-/g, " "),
    }));
  }, []);

  // 2. Har graveyard ke liye records count calculate karna
  const counts = useMemo(() => {
    const res = {};
    dynamicLocations.forEach((loc) => {
      res[loc.id] = graveyardDatabase.filter(
        (d) => d.Graveyard === loc.id
      ).length;
    });
    return res;
  }, [dynamicLocations]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {dynamicLocations.map((loc, i) => (
        <motion.div
          key={loc.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={`/graveyard/${loc.slug}`} className="group block h-full">
            <div className="h-full bg-white border border-slate-100 p-8 rounded-[2.5rem] transition-all group-hover:bg-emerald-900 group-hover:shadow-2xl group-hover:shadow-emerald-900/20 flex flex-col items-center">
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <FaMapMarkerAlt size={20} />
              </div>

              {/* Dynamic Name */}
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-white mb-2 capitalize">
                {loc.displayName}
              </h3>

              {/* Dynamic Count */}
              <div className="text-2xl font-serif font-bold text-emerald-600 group-hover:text-emerald-300">
                {counts[loc.id] || 0}
              </div>

              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-400/60 mt-1">
                Records Found
              </span>

              <FaChevronRight className="mt-6 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
