import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFingerprint,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

export default function GraveCard({ grave }) {
  // Destructuring your data structure
  const { Id, GraveNo, Graveyard, Name, KHUNDI, DOD } = grave;

  return (
    <Link href={`/grave/${Id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        viewport={{ once: true }}
        className="group relative bg-white rounded-[2.5rem] p-7 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all overflow-hidden"
      >
        {/* Top Decorative Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-200" />

        {/* Card Header: Grave ID & Khundi */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
            <FaFingerprint className="text-emerald-500 text-[10px]" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">
              Grave #{GraveNo}
            </span>
          </div>
          <div className="text-[9px] font-black text-emerald-600/30 group-hover:text-emerald-600 transition-colors uppercase italic tracking-widest">
            {KHUNDI}
          </div>
        </div>

        {/* Main Details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight group-hover:text-emerald-800 transition-colors">
              {Name}
            </h3>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] mt-2">
              {KHUNDI} Khundi
            </p>
          </div>

          <hr className="border-slate-50" />

          {/* Location & Date Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FaMapMarkerAlt size={12} />
              </div>
              <div>
                <p className="text-[8px] uppercase text-slate-400 font-bold leading-none mb-1">
                  Location
                </p>
                <p className="text-[11px] font-bold text-slate-700 capitalize">
                  {Graveyard.replace(/(\d+)/, " $1")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FaCalendarAlt size={12} />
              </div>
              <div>
                <p className="text-[8px] uppercase text-slate-400 font-bold leading-none mb-1">
                  Passed On
                </p>
                <p className="text-[11px] font-bold text-slate-700">
                  {DOD || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Action Hint */}
        <div className="mt-8 flex items-center justify-end">
          <span className="text-[9px] font-black text-emerald-600 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all uppercase tracking-[0.2em] flex items-center gap-2">
            View Full Record <FaArrowRight />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
