"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function CountUp({ to }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString()
  );
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    // 2 seconds mein animation complete hogi
    const controls = animate(count, to, { duration: 2, ease: "easeOut" });

    // UI update trigger karne ke liye
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [to]);

  return <motion.span>{displayValue}</motion.span>;
}
