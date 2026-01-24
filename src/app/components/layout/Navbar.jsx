"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaHistory,
  FaMapMarkedAlt,
} from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Khundi",
    href: "/khundi",
    icon: <FaHistory className="text-[10px]" />,
  },
  {
    name: "Graveyards",
    href: "/graveyard",
    icon: <FaMapMarkedAlt className="text-[10px]" />,
  },
  {
    name: "Full Archive",
    href: "/archive",
    icon: <FaSearch className="text-[10px]" />,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Scroll effect handle karne ke liye
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getTextColor = () => {
    if (!isHomePage) return "text-slate-900"; // Other pages par hamesha black
    return scrolled ? "text-slate-900" : "text-slate-100"; // Home page logic
  };
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`
          relative flex items-center justify-between px-6 py-3 rounded-[2rem] transition-all duration-500
          ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl shadow-lg border border-slate-200/50"
              : "bg-transparent"
          }
        `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`w-24 h-24 ${
                scrolled ? "" : "bg-emerald-600"
              }  rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-600/20 group-hover:rotate-12 transition-transform`}
            >
              <img src={"/logo.png"} alt="OMJ Logo" />
            </div>
            <div>
              <h1
                className={`text-sm font-black ${getTextColor()}  leading-none uppercase tracking-tighter`}
              >
                Okhai Memon <br />{" "}
                <span className="text-emerald-600">Jamat</span>
                <br />
                Graveyard Portal{" "}
              </h1>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all
                    ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                    }
                  `}
                >
                  {link.icon} {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[80%] left-0 w-full px-4 py-2 md:hidden"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest ${
                    pathname === link.href
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-slate-500"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
