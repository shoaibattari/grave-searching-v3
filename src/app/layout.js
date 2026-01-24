import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "OMJ Graveyard Digital Archive | Okhai Memon Jamat",
    template: "%s | OMJ Archive",
  },
  description:
    "Official Digital Memorial Archive of Okhai Memon Jamat. Search burial records, lineages (Khundi), and graveyard locations.",
  keywords: [
    "Okhai Memon Jamat",
    "OMJ",
    "Grave Search",
    "Memon Community",
    "Digital Archive",
  ],
  authors: [{ name: "Shoaib Abdul Sattar Khosa" }],
  icons: {
    icon: "/favicon.ico", // Public folder mein icon hona chahiye
  },
  openGraph: {
    title: "OMJ Digital Archive",
    description: "Search and verify community burial records online.",
    url: "https://your-domain.com",
    siteName: "Okhai Memon Jamat",
    images: [
      {
        url: "/og-image.jpg", // WhatsApp/Facebook share image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
