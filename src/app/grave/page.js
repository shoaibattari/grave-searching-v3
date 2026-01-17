import { graveyardDatabase } from "../constant/database";

export default function GraveDetail({ params }) {
  const grave = graveyardDatabase.find((d) => d.Id === params.id);

  if (!grave) return <div>Record not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-20 flex justify-center">
      <div className="bg-white p-12 rounded-[3rem] shadow-xl max-w-2xl w-full border border-slate-100">
        <h2 className="text-3xl font-serif font-bold text-emerald-700 mb-2">
          {grave.Name}
        </h2>
        <p className="text-slate-400 mb-8 tracking-widest uppercase text-sm">
          {grave.KHUNDI} Khundi
        </p>

        <div className="space-y-6 border-t pt-8">
          <DetailRow label="Grave Number" value={grave.GraveNo} />
          <DetailRow label="Location" value={grave.Graveyard} />
          <DetailRow label="Date of Death" value={grave.DOD} />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-4 border-slate-50">
      <span className="text-slate-400 font-bold uppercase text-[10px]">
        {label}
      </span>
      <span className="text-slate-900 font-bold">{value}</span>
    </div>
  );
}
