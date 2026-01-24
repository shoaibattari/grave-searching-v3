"use client";
import React from "react";
import { motion } from "framer-motion";

export const SectionHeading = ({
  title, // Pehla part (e.g., "Digital")
  highlight, // Emerald color wala part (e.g., "Archive")
  subtitle, // Chota text niche wala
  align = "center", // "center" ya "left"
}) => {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-16 ${isCenter ? "text-center" : "text-left"}`}
    >
      {/* Title & Highlight */}
      <h2 className="text-2xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
        {title} <span className="text-emerald-600 italic">{highlight}</span>
      </h2>

      {/* Decorative Line */}
      <div
        className={`h-1.5 w-24 bg-emerald-500 mt-4 rounded-full ${
          isCenter ? "mx-auto" : "mr-auto"
        }`}
      />

      {/* Subtitle */}
      {subtitle && (
        <p className="text-slate-500 mt-5 uppercase tracking-[0.25em] text-[10px] md:text-xs font-black">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
