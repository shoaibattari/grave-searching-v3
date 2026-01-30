"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaChevronRight, FaDirections } from "react-icons/fa";
import { graveyardDatabase } from "../constant/database";
import CountUp from "./ui/CountUp";

const MAP_LINKS = {
  hubriver1: "https://maps.google.com/?q=Hub+River+Road+Cemetery+1",
  hubriver2: "https://maps.google.com/?q=Hub+River+Road+Cemetery+2",
  hubriver3: "https://maps.google.com/?q=Hub+River+Road+Cemetery+3",
  saaditown: "https://maps.google.com/?q=Saadi+Town+Cemetery",
  mewashah: "https://maps.google.com/?q=Mewashah+Cemetery",
};

export default function Graveyards() {
  const dynamicLocations = useMemo(() => {
    const uniqueNames = [
      ...new Set(graveyardDatabase.map((item) => item.Graveyard)),
    ].filter(Boolean);
    // Alphabetical Sort Logic (A-Z)
    uniqueNames.sort((a, b) => a.localeCompare(b));
    return uniqueNames.map((name) => {
      const id = name.toLowerCase().replace(/\s+/g, "");
      return {
        id: name,
        slug: name.toLowerCase(),
        displayName: name
          .replace(/([a-zA-Z]+)(\d+)/, "$1 $2")
          .replace(/-/g, " "),
        mapUrl:
          MAP_LINKS[id] ||
          `https://www.google.com/maps/search/${encodeURIComponent(name)}`,
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
          {/* Main Container */}
          <div className="flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/20 lg:group-hover:bg-emerald-900 group">
            {/* Upper Content: Clickable Area */}
            <Link
              href={`/graveyard/${loc.slug}`}
              className="flex-1 p-8 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 lg:group-hover:bg-emerald-500 lg:group-hover:text-white transition-all duration-500 lg:group-hover:rotate-[360deg]">
                <FaMapMarkerAlt size={24} />
              </div>

              <h3 className="text-xl font-black text-slate-800 lg:group-hover:text-white mb-2 uppercase tracking-tight">
                {loc.displayName}
              </h3>

              <div className="mt-auto">
                <div className="text-3xl font-serif font-bold text-emerald-600 lg:group-hover:text-emerald-300 transition-colors">
                  <CountUp to={counts[loc.id] || 0} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 lg:group-hover:text-emerald-400/60">
                  Total Records
                </p>
              </div>

              {/* Desktop View Indicator: Only visible on desktop hover */}
              <div className="hidden lg:flex mt-6 items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                View Records <FaChevronRight size={10} />
              </div>
            </Link>

            {/* Bottom Actions: Visible on Mobile, Hover on Desktop */}
            <div className="flex border-t border-slate-50 lg:border-none">
              <Link
                href={`/graveyard/${loc.slug}`}
                className="flex-1 lg:hidden py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 bg-emerald-50/50"
              >
                Open GraveYard
              </Link>
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 lg:absolute lg:top-5 lg:right-5 p-4 lg:p-3 bg-slate-900 lg:bg-white/10 text-white lg:backdrop-blur-md lg:border lg:border-white/20 rounded-none lg:rounded-2xl opacity-100 lg:opacity-0 lg:group-hover:opacity-100 hover:bg-emerald-500 transition-all z-20 flex items-center justify-center gap-2 lg:gap-0"
              >
                <FaDirections size={18} />
                <span className="lg:hidden text-[10px] font-black uppercase tracking-widest">
                  Directions
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
