"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";

type Kegiatan = {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  lokasi: string;
};

export default function AdminKegiatanPage() {
  const [data, setData] = useState<Kegiatan[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ judul: "", deskripsi: "", tanggal: "", lokasi: "" });
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Kegiatan | null>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("kegiatan").select("*").order("tanggal", { ascending: false });
    setData(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    if (!form.judul || !form.tanggal) return alert("Judul dan tanggal wajib diisi.");
    setSaving(true);
    await supabase.from("kegiatan").insert([form]);
    setForm({ judul: "", deskripsi: "", tanggal: "", lokasi: "" });
    await fetchData();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus kegiatan ini?")) return;
    await supabase.from("kegiatan").delete().eq("id", id);
    await fetchData();
  };

  const handleEdit = async () => {
    if (!editing) return;
    setSaving(true);
    await supabase.from("kegiatan").update({
      judul: editing.judul,
      deskripsi: editing.deskripsi,
      tanggal: editing.tanggal,
      lokasi: editing.lokasi,
    }).eq("id", editing.id);
    setEditing(null);
    await fetchData();
    setSaving(false);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
        <Link href="/admin/dashboard" className="text-slate-400 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <p className="text-xs text-blue-500 font-semibold uppercase tracking-widest">Admin Panel</p>
          <h1 className="text-lg font-bold text-slate-800">Kelola Kegiatan</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Card className="border border-blue-100">
          <CardContent className="p-6 space-y-4">
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-500" /> Tambah Kegiatan
            </p>
            <input placeholder="Judul Kegiatan" value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea placeholder="Deskripsi kegiatan" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="Lokasi" value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button onClick={handleAdd} disabled={saving} className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {loading ? (
            <p className="text-center text-slate-400 text-sm">Memuat data...</p>
          ) : data.length === 0 ? (
            <p className="text-center text-slate-400 text-sm">Belum ada kegiatan.</p>
          ) : (
            data.map((item) => (
              <Card key={item.id} className="border border-slate-100">
                <CardContent className="flex items-start justify-between gap-4 p-5">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700">{item.judul}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.deskripsi}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.tanggal} • {item.lokasi}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => setEditing(item)} className="text-slate-300 hover:text-blue-500 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <Card className="w-full max-w-lg border border-blue-100">
            <CardContent className="p-6 space-y-4">
              <p className="text-sm font-semibold text-slate-700">Edit Kegiatan</p>
              <input value={editing.judul} onChange={(e) => setEditing({...editing, judul: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea value={editing.deskripsi} onChange={(e) => setEditing({...editing, deskripsi: e.target.value})} rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" value={editing.tanggal} onChange={(e) => setEditing({...editing, tanggal: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input value={editing.lokasi} onChange={(e) => setEditing({...editing, lokasi: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-3">
                <button onClick={handleEdit} disabled={saving} className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50">
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
                <button onClick={() => setEditing(null)} className="text-slate-500 text-sm px-4 py-2 rounded-lg border border-slate-200">Batal</button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}