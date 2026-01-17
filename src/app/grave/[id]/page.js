import { graveyardDatabase } from "@/app/constant/database";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import Link from "next/link";
import {
  FaArrowLeft,
  FaPrint,
  FaUser,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

// Note: Yahan se "use client" hata diya hai taake async/await sahi kaam kare
export default async function GraveDetail({ params }) {
  // 1. ID nikalna
  const { id } = await params;

  // 2. Data dhoondna
  const record = graveyardDatabase.find(
    (item) => item.Id.toString() === id.toString()
  );

  // 3. Agar record nahi mila
  if (!record) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold">Record Not Found</h2>
          <Link
            href="/archive"
            className="text-emerald-600 underline mt-4 block"
          >
            Archive par wapis jayen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 md:py-24  px-4">
      <div className="max-w-3xl mx-auto">
        {/* Simple Back Button */}
        <Link
          href="/archive"
          className="inline-flex items-center gap-2 text-slate-500 font-bold text-xs mb-6 print:hidden"
        >
          <FaArrowLeft /> Go Back
        </Link>

        {/* --- MAIN CARD --- */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
          {/* Green Header */}
          <div className="bg-emerald-800 p-8 text-white flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Okhai Memon Jamat</h1>
              <p className="text-emerald-300 text-[10px] tracking-widest uppercase">
                Digital Archive Record
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] opacity-60 block">GRAVE NO</span>
              <span className="text-2xl font-black">#{record.GraveNo}</span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <SectionHeading title="Grave" highlight="Details" align="left" />

            {/* Simple Data Rows */}
            <div className="space-y-6 mt-8">
              <DetailRow
                label="Marhoom ka Naam"
                value={record.Name}
                icon={<FaUser />}
              />
              <DetailRow
                label="Khundi / Shajra"
                value={record.KHUNDI}
                icon={<FaUsers />}
              />
              <DetailRow
                label="Qabristan"
                value={record.Graveyard}
                icon={<FaMapMarkerAlt />}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Chota component taake code easy rahe
function DetailRow({ label, value, icon }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">
          {label}
        </p>
        <p className="text-lg font-bold text-slate-800 uppercase">
          {value || "Available Nahi Hai"}
        </p>
      </div>
    </div>
  );
}
