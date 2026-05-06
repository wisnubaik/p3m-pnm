"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";

type Dokumen = {
  id: number;
  judul: string;
  kategori: string;
  url: string;
  tahun: number;
};

export default function AdminDokumenPage() {
  const [data, setData] = useState<Dokumen[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ judul: "", kategori: "", url: "", tahun: "" });
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Dokumen | null>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("dokumen").select("*").order("tahun", { ascending: false });
    setData(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    if (!form.judul || !form.kategori || !form.tahun) return alert("Judul, kategori, dan tahun wajib diisi.");
    setSaving(true);
    await supabase.from("dokumen").insert([form]);
    setForm({ judul: "", kategori: "", url: "", tahun: "" });
    await fetchData();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus dokumen ini?")) return;
    await supabase.from("dokumen").delete().eq("id", id);
    await fetchData();
  };

  const handleEdit = async () => {
    if (!editing) return;
    setSaving(true);
    await supabase.from("dokumen").update({
      judul: editing.judul,
      kategori: editing.kategori,
      url: editing.url,
      tahun: editing.tahun,
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
          <h1 className="text-lg font-bold text-slate-800">Kelola Dokumen & Luaran</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Card className="border border-blue-100">
          <CardContent className="p-6 space-y-4">
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-500" /> Tambah Dokumen
            </p>
            <input placeholder="Judul Dokumen" value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input placeholder="URL Dokumen (Google Drive, dll)" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="grid grid-cols-2 gap-4">
              <select value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Pilih Kategori</option>
                <option value="Penelitian">Penelitian</option>
                <option value="PKM">PKM</option>
                <option value="Laporan">Laporan</option>
                <option value="Template">Template</option>
                <option value="Panduan">Panduan</option>
              </select>
              <input placeholder="Tahun" type="number" value={form.tahun} onChange={(e) => setForm({ ...form, tahun: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
            <p className="text-center text-slate-400 text-sm">Belum ada dokumen.</p>
          ) : (
            data.map((item) => (
              <Card key={item.id} className="border border-slate-100">
                <CardContent className="flex items-start justify-between gap-4 p-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="text-xs bg-blue-100 text-blue-700">{item.kategori}</Badge>
                      <span className="text-xs text-slate-400">{item.tahun}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{item.judul}</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline mt-1 block truncate">{item.url}</a>
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
              <p className="text-sm font-semibold text-slate-700">Edit Dokumen</p>
              <input value={editing.judul} onChange={(e) => setEditing({...editing, judul: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input value={editing.url} onChange={(e) => setEditing({...editing, url: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-2 gap-4">
                <select value={editing.kategori} onChange={(e) => setEditing({...editing, kategori: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="Penelitian">Penelitian</option>
                  <option value="PKM">PKM</option>
                  <option value="Laporan">Laporan</option>
                  <option value="Template">Template</option>
                  <option value="Panduan">Panduan</option>
                </select>
                <input type="number" value={editing.tahun} onChange={(e) => setEditing({...editing, tahun: Number(e.target.value)})} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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