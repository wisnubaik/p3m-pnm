"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Pengumuman = {
  id: number;
  judul: string;
  isi: string;
  tag: string;
  tanggal: string;
};

export default function AdminPengumumanPage() {
  const [data, setData] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ judul: "", isi: "", tag: "", tanggal: "" });
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    const { data } = await supabase.from("pengumuman").select("*").order("tanggal", { ascending: false });
    setData(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    if (!form.judul || !form.tag || !form.tanggal) return alert("Judul, tag, dan tanggal wajib diisi.");
    setSaving(true);
    await supabase.from("pengumuman").insert([form]);
    setForm({ judul: "", isi: "", tag: "", tanggal: "" });
    await fetchData();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus pengumuman ini?")) return;
    await supabase.from("pengumuman").delete().eq("id", id);
    await fetchData();
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
        <Link href="/admin/dashboard" className="text-slate-400 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <p className="text-xs text-blue-500 font-semibold uppercase tracking-widest">Admin Panel</p>
          <h1 className="text-lg font-bold text-slate-800">Kelola Pengumuman</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Form Tambah */}
        <Card className="border border-blue-100">
          <CardContent className="p-6 space-y-4">
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-500" /> Tambah Pengumuman
            </p>
            <input
              placeholder="Judul"
              value={form.judul}
              onChange={(e) => setForm({ ...form, judul: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Isi pengumuman"
              value={form.isi}
              onChange={(e) => setForm({ ...form, isi: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Tag (contoh: Penelitian)"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAdd}
              disabled={saving}
              className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </CardContent>
        </Card>

        {/* Daftar */}
        <div className="space-y-3">
          {loading ? (
            <p className="text-center text-slate-400 text-sm">Memuat data...</p>
          ) : data.length === 0 ? (
            <p className="text-center text-slate-400 text-sm">Belum ada pengumuman.</p>
          ) : (
            data.map((item) => (
              <Card key={item.id} className="border border-slate-100">
                <CardContent className="flex items-start justify-between gap-4 p-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="text-xs bg-blue-100 text-blue-700">{item.tag}</Badge>
                      <span className="text-xs text-slate-400">{item.tanggal}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{item.judul}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.isi}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
}