import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

async function getKegiatan() {
  const { data, error } = await supabase
    .from("kegiatan")
    .select("*")
    .order("tanggal", { ascending: false });

  if (error) return [];
  return data;
}

export default async function KegiatanPage() {
  const kegiatan = await getKegiatan();

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
            Kegiatan
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto text-lg">
            Agenda dan kegiatan P3M Politeknik Negeri Madiun
          </p>
        </div>
      </section>

      {/* Konten */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {kegiatan.length === 0 ? (
          <p className="text-center text-slate-400">Belum ada kegiatan.</p>
        ) : (
          <div className="grid gap-4">
            {kegiatan.map((item: any) => (
              <Card
                key={item.id}
                className="border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <CardContent className="p-5">
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors mb-3">
                    {item.judul}
                  </p>
                  <p className="text-sm text-slate-400 mb-3">{item.deskripsi}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.lokasi}
                    </span>
                  </div>
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