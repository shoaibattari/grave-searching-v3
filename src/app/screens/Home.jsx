"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FaDatabase, FaSkull, FaUsers } from "react-icons/fa";

// Components & Data

import { graveyardDatabase } from "../constant/database";
import Khundis from "../components/archive/Khundis";
import Graveyards from "../components/Graveyards";
import { SectionHeading } from "../components/ui/SectionHeading";
import CountUp from "../components/ui/CountUp";
import ImageGallery from "../components/ui/Gallery";
import Link from "next/link";

export default function Home() {
  // 1. Dynamic Stats Calculation
  const stats = useMemo(() => {
    return [
      {
        label: "Total Record's",
        value: graveyardDatabase.length,
        icon: <FaDatabase />,
        color: "text-emerald-600",
      },
      {
        label: "Graveyard's",
        value: 4,
        icon: <FaSkull />,
        color: "text-slate-600",
      },
      {
        label: "Khundi's",
        value: 35, // Aapke Khundis.js array ki length
        icon: <FaUsers />,
        color: "text-blue-600",
      },
    ];
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <header className="relative py-24 md:py-32 bg-slate-900 overflow-hidden text-center text-white pt-40">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-emerald-400 font-black tracking-[0.4em] uppercase text-[10px] mb-4 block"
          >
            Okhai Memon Jamat Official
          </motion.span>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-7xl font-serif font-bold mb-6 leading-tight"
          >
            Digital{" "}
            <span className="text-emerald-500 text-italic">Memorial</span>{" "}
            <br />
            Archive Portal
          </motion.h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12">
            Preserving history through technology. Access thousands of burial
            records, Khundi data, and graveyard locations with a single click.
          </p>

          {/* --- STATS DASHBOARD --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-16">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-[2rem] text-center"
              >
                <div
                  className={`${stat.color} text-2xl flex justify-center mb-2`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white">
                  <CountUp to={stat.value} />+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </header>

      {/* --- QUICK LINKS: GRAVEYARDS --- */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Browse by"
            highlight="Location"
            subtitle="Search records by specific graveyard"
          />
          <Graveyards />
        </div>
      </section>

      {/* --- Khundi SECTION: KHUNDIS --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Search by"
            highlight="Khundi"
            subtitle="Explore records by Khundi family names"
          />
          <Khundis />
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Visual"
            highlight="Archive"
            subtitle="A collection of memories and site developments"
          />
          <ImageGallery />
        </div>
      </section>

      {/* --- FOOTER SECTION: OMJ IT COMMITTEE & TECH PORTAL --- */}
      <footer className="w-full bg-slate-900 text-white py-16 border-t border-emerald-500/30">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-12 mb-12 text-center md:text-left border-b border-white/5 pb-12">
            {/* 1. Tech Portal Identity */}
            <div className="flex flex-col items-center md:items-start">
              <img src="/logo.png" className="h-40 mb-6" alt="OMJ Logo" />
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                Advanced Graveyard Searching Portal. Leveraging digital indexing
                to provide instant access to burial records and family lineages
                through a secure centralized archive.
              </p>
            </div>

            {/* 2. Technical Leadership (OMJ IT Committee) */}
            <div className="flex flex-col items-center">
              <h4 className="text-emerald-500 font-black mb-6 uppercase tracking-[0.3em] text-[10px]">
                App Developed By
              </h4>
              <a
                className="group flex flex-col items-center transition-all bg-white/5 p-6 rounded-[2.5rem] border border-white/10 hover:bg-emerald-600/10 hover:border-emerald-500/50 shadow-2xl shadow-black/20"
                href="https://wa.me/+923313416850"
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                  Shoaib Abdul Sattar Khosa
                </span>
                <div className="flex flex-col items-center mt-3 space-y-1 text-center">
                  <span className="text-slate-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Vice Chairman (OMJ IT Committee)
                  </span>
                </div>
              </a>
            </div>

            {/* 3. Organization & Committee */}
            <div className="flex flex-col items-center md:items-end">
              <h4 className="text-blue-400 font-black mb-3 md:mb-6 uppercase tracking-[0.3em] text-[10px]">
                Supervised By
              </h4>
              <div className="text-center md:text-right">
                <p className="text-2xl font-black tracking-tight text-white uppercase">
                  Okhai Memon Jamat
                </p>
                <p className="text-emerald-500 font-bold text-sm mt-1 uppercase tracking-widest">
                  IT Committee
                </p>
              </div>
            </div>
          </div>

          {/* Copyright & Technical Stack Row */}
          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-6">
            <p className="text-slate-500 text-[16px] font-medium">
              © {new Date().getFullYear()}{" "}
              <span className="text-slate-300">OMJ IT Committee</span>.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
