import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // refresh data tiap 60 detik

async function getPengumuman() {
  const { data, error } = await supabase
    .from("pengumuman")
    .select("*")
    .order("tanggal", { ascending: false });

  if (error) return [];
  return data;
}

export default async function PengumumanPage() {
  const pengumuman = await getPengumuman();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs tracking-widest uppercase px-4 py-1">
            Informasi
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Pengumuman
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto text-lg">
            Informasi terbaru seputar kegiatan P3M Politeknik Negeri Madiun
          </p>
        </div>
      </section>

      {/* Konten */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {pengumuman.length === 0 ? (
          <p className="text-center text-slate-400">Belum ada pengumuman.</p>
        ) : (
          <div className="grid gap-4">
            {pengumuman.map((item: any) => (
              <Card
                key={item.id}
                className="border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
              >
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bell className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        {item.tag}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        {new Date(item.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors mb-1">
                      {item.judul}
                    </p>
                    <p className="text-sm text-slate-400">{item.isi}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-blue-200 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-bold text-white text-lg mb-1">P3M — Politeknik Negeri Madiun</p>
          <p className="text-sm text-blue-400">Pusat Penelitian dan Pengabdian kepada Masyarakat</p>
          <p className="text-xs text-blue-600 mt-6">© {new Date().getFullYear()} P3M PNM. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}