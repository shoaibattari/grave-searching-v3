"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaChevronRight, FaDirections } from "react-icons/fa";
import { graveyardDatabase } from "../constant/database";
import CountUp from "./ui/CountUp";

// 1. Aapka provided data
const MAP_LINKS = {
  hubriver1: "https://maps.app.goo.gl/uPKanwD3tjwc6MbEA",
  hubriver2: " https://maps.app.goo.gl/5XcuG4xvEi5RgpNg7",
  hubriver3: "https://maps.app.goo.gl/LMopQ8rZHTbw9GLb9",
  saaditown: "https://maps.app.goo.gl/ia2yisUKwW7WQx5Y8",
  mewashah: "https://maps.app.goo.gl/3bJJmSXdHtVXVYBo9",
};

export default function Graveyards() {
  const dynamicLocations = useMemo(() => {
    const uniqueNames = [
      ...new Set(graveyardDatabase.map((item) => item.Graveyard)),
    ].filter(Boolean);

    return uniqueNames.map((name) => {
      const id = name.toLowerCase().replace(/\s+/g, ""); // "Hub River 1" -> "hubriver1"
      return {
        id: name,
        slug: name.toLowerCase(),
        displayName: name
          .replace(/([a-zA-Z]+)(\d+)/, "$1 $2")
          .replace(/-/g, " "),
        mapUrl:
          MAP_LINKS[id] ||
          `https://maps.google.com/?q=Mewa+Shah+Graveyard6{name}`,
      };
    });
  }, []);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {dynamicLocations.map((loc, i) => (
        <motion.div
          key={loc.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Main Card: Website ke andar navigation ke liye */}
          <Link href={`/graveyard/${loc.slug}`} className="block h-full">
            <div className="h-full bg-white border border-slate-100 p-8 rounded-[2.5rem] transition-all duration-500 group-hover:bg-emerald-900 group-hover:shadow-2xl group-hover:shadow-emerald-900/30 flex flex-col items-center text-center">
              {/* Animated Icon */}
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
                <FaMapMarkerAlt size={24} />
              </div>

              <h3 className="text-xl font-black text-slate-800 group-hover:text-white mb-2 uppercase tracking-tight">
                {loc.displayName}
              </h3>

              <div className="mt-auto">
                <div className="text-3xl font-serif font-bold text-emerald-600 group-hover:text-emerald-300 transition-colors">
                  <CountUp to={counts[loc.id] || 0} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-400/60">
                  Total Records
                </p>
              </div>

              {/* View Indicator */}
              <div className="mt-6 flex items-center gap-2 text-emerald-600 group-hover:text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                Open Records <FaChevronRight size={10} />
              </div>
            </div>
          </Link>

          {/* Get Directions Button: Seedha Google Maps par jane ke liye */}
          <a
            href={loc.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-5 right-5 p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl opacity-0 group-hover:opacity-100 hover:bg-emerald-500 hover:border-emerald-500 transition-all z-20 shadow-xl"
            title="Get Directions"
            onClick={(e) => e.stopPropagation()} // Taake card ka Link trigger na ho
          >
            <FaDirections size={20} />
          </a>
        </motion.div>
      ))}
    </div>
  );
}
