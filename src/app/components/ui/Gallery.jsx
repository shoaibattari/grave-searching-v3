"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExpand, FaTimes } from "react-icons/fa";

// Sample Dynamic Data (Ise aap separate file mein bhi rakh sakte hain)
export const galleryData = [
  {
    id: 1,
    title: "Main Layout Map",
    category: "Maps",
    src: "/map.jpeg",
  },
  {
    id: 2,
    title: "Grave View 1",
    category: "Grave Sites",
    src: "/grave-1.jpeg",
  },
  {
    id: 3,
    title: "Grave View 2",
    category: "Grave Sites",
    src: "/grave-2.jpeg",
  },
  {
    id: 4,
    title: "Grave View 4",
    category: "Grave Sites",
    src: "/grave-4.jpeg",
  },
  {
    id: 5,
    title: "Grave View 6",
    category: "Grave Sites",
    src: "/grave-6.jpeg",
  },
  {
    id: 6,
    title: "Hub 2 Cemetery Map",
    category: "Maps",
    src: "/Hub2-Map.jpeg",
  },
  {
    id: 7,
    title: "Hub 3 Entrance Gate",
    category: "Sites",
    src: "/Hub3-Gate.jpeg",
  },
];

export default function ImageGallery() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    ...new Set(galleryData.map((item) => item.category)),
  ];
  const filteredData =
    filter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  return (
    <div className="py-10">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === cat
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
      >
        <AnimatePresence>
          {filteredData.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative group cursor-pointer break-inside-avoid rounded-[2rem] overflow-hidden border border-slate-100 bg-white"
              onClick={() => setSelectedImg(item)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  {item.category}
                </span>
                <h4 className="text-white font-bold">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox (Full Screen View) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-10 right-10 text-white text-2xl">
              <FaTimes />
            </button>
            <motion.img
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              src={selectedImg.src}
              className="max-w-full max-h-[80vh] rounded-3xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
