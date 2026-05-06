import Link from "next/link";
import { Bell, BookOpen, Users, FileText, Calendar, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

async function getStats() {
  const [pengumuman, penelitian, pkm, dokumen, kegiatan] = await Promise.all([
    supabase.from("pengumuman").select("id", { count: "exact" }),
    supabase.from("penelitian").select("id", { count: "exact" }),
    supabase.from("pkm").select("id", { count: "exact" }),
    supabase.from("dokumen").select("id", { count: "exact" }),
    supabase.from("kegiatan").select("id", { count: "exact" }),
  ]);

  return {
    pengumuman: pengumuman.count ?? 0,
    penelitian: penelitian.count ?? 0,
    pkm: pkm.count ?? 0,
    dokumen: dokumen.count ?? 0,
    kegiatan: kegiatan.count ?? 0,
  };
}

const menus = [
  { label: "Pengumuman", href: "/admin/pengumuman", icon: Bell, desc: "Kelola pengumuman" },
  { label: "Penelitian", href: "/admin/penelitian", icon: BookOpen, desc: "Kelola data penelitian" },
  { label: "PKM", href: "/admin/pkm", icon: Users, desc: "Kelola data PKM" },
  { label: "Dokumen & Luaran", href: "/admin/dokumen", icon: FileText, desc: "Kelola repository dokumen" },
  { label: "Kegiatan", href: "/admin/kegiatan", icon: Calendar, desc: "Kelola kegiatan" },
];

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-blue-500 font-semibold uppercase tracking-widest">Admin Panel</p>
          <h1 className="text-lg font-bold text-slate-800">P3M — Politeknik Negeri Madiun</h1>
        </div>
        <Link
          href="/api/auth/logout"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Keluar
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {[
            { label: "Pengumuman", value: stats.pengumuman },
            { label: "Penelitian", value: stats.penelitian },
            { label: "PKM", value: stats.pkm },
            { label: "Dokumen", value: stats.dokumen },
            { label: "Kegiatan", value: stats.kegiatan },
          ].map((s) => (
            <Card key={s.label} className="border border-blue-100">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">{s.value}</p>
                <p className="text-xs text-slate-400 mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Menu */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menus.map((menu) => (
            <Link key={menu.href} href={menu.href}>
              <Card className="border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <menu.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                      {menu.label}
                    </p>
                    <p className="text-xs text-slate-400">{menu.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}