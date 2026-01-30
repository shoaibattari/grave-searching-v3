"use client";
import { useState, useEffect } from "react";

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check karein ke kya user pehle video dekh chuka hai
    const hasSeenVideo = localStorage.getItem("hasSeenIntroVideo");

    if (!hasSeenVideo) {
      setIsOpen(true);
    }
  }, []);

  const closeVideo = () => {
    setIsOpen(false);
    // LocalStorage mein save kar dein taake dobara na dikhe
    localStorage.setItem("hasSeenIntroVideo", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-black shadow-2xl">
        {/* Close Button */}
        <button
          onClick={closeVideo}
          className="absolute bottom-20 right-1 z-10 text-white bg-emerald-800 hover:bg-white/20 rounded-2xl px-2 transition"
        >
          Skip
        </button>

        {/* Video Player */}
        <video
          className="w-full aspect-video"
          controls
          autoPlay
          muted
          onEnded={closeVideo} // Video khatam hote hi modal band ho jaye
        >
          <source src="/Omj-Grave-Info.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
