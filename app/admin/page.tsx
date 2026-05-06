"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";

type Pkm = {
  id: number;
  judul: string;
  ketua: string;
  anggota: string;
  tahun: number;
  jenis: string;
  status: string;
};

export default function AdminPkmPage() {
  const [data, setData] = useState<Pkm[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ judul: "", ketua: "", anggota: "", tahun: "", jenis: "internal", status: "aktif" });
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Pkm | null>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("pkm").select("*").order("tahun", { ascending: false });
    setData(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    if (!form.judul || !form.ketua || !form.tahun) return alert("Judul, ketua, dan tahun wajib diisi.");
    setSaving(true);
    await supabase.from("pkm").insert([form]);
    setForm({ judul: "", ketua: "", anggota: "", tahun: "", jenis: "internal", status: "aktif" });
    await fetchData();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus PKM ini?")) return;
    await supabase.from("pkm").delete().eq("id", id);
    await fetchData();
  };

  const handleEdit = async () => {
    if (!editing) return;
    setSaving(true);
    await supabase.from("pkm").update({
      judul: editing.judul,
      ketua: editing.ketua,
      anggota: editing.anggota,
      tahun: editing.tahun,
      jenis: editing.jenis,
      status: editing.status,
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
          <h1 className="text-lg font-bold text-slate-800">Kelola PKM</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Card className="border border-blue-100">
          <CardContent className="p-6 space-y-4">
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-500" /> Tambah PKM
            </p>
            <input placeholder="Judul PKM" value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Ketua" value={form.ketua} onChange={(e) => setForm({ ...form, ketua: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="Anggota" value={form.anggota} onChange={(e) => setForm({ ...form, anggota: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <input placeholder="Tahun" type="number" value={form.tahun} onChange={(e) => setForm({ ...form, tahun: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <select value={form.jenis} onChange={(e) => setForm({ ...form, jenis: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="internal">Internal</option>
                <option value="eksternal">Eksternal</option>
                <option value="unggulan">Unggulan</option>
              </select>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="aktif">Aktif</option>
                <option value="selesai">Selesai</option>
              </select>
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
            <p className="text-center text-slate-400 text-sm">Belum ada data PKM.</p>
          ) : (
            data.map((item) => (
              <Card key={item.id} className="border border-slate-100">
                <CardContent className="flex items-start justify-between gap-4 p-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="text-xs bg-blue-100 text-blue-700">{item.jenis}</Badge>
                      <Badge className={`text-xs ${item.status === "aktif" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{item.status}</Badge>
                      <span className="text-xs text-slate-400">{item.tahun}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{item.judul}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.ketua} {item.anggota ? `• ${item.anggota}` : ""}</p>
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
              <p className="text-sm font-semibold text-slate-700">Edit PKM</p>
              <input value={editing.judul} onChange={(e) => setEditing({...editing, judul: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-2 gap-4">
                <input value={editing.ketua} onChange={(e) => setEditing({...editing, ketua: e.target.value})} placeholder="Ketua" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input value={editing.anggota} onChange={(e) => setEditing({...editing, anggota: e.target.value})} placeholder="Anggota" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <input type="number" value={editing.tahun} onChange={(e) => setEditing({...editing, tahun: Number(e.target.value)})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select value={editing.jenis} onChange={(e) => setEditing({...editing, jenis: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="internal">Internal</option>
                  <option value="eksternal">Eksternal</option>
                  <option value="unggulan">Unggulan</option>
                </select>
                <select value={editing.status} onChange={(e) => setEditing({...editing, status: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="aktif">Aktif</option>
                  <option value="selesai">Selesai</option>
                </select>
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