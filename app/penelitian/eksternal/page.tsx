import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, User, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

async function getPenelitian() {
  const { data, error } = await supabase
    .from("penelitian")
    .select("*")
    .eq("jenis", "eksternal")
    .order("tahun", { ascending: false });

  if (error) return [];
  return data;
}

export default async function PenelitianEksternalPage() {
  const penelitian = await getPenelitian();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs tracking-widest uppercase px-4 py-1">
            Penelitian
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Penelitian Eksternal
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto text-lg">
            Daftar penelitian eksternal sivitas akademika Politeknik Negeri Madiun
          </p>
        </div>
      </section>

      {/* Konten */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {penelitian.length === 0 ? (
          <p className="text-center text-slate-400">Belum ada data penelitian.</p>
        ) : (
          <div className="grid gap-4">
            {penelitian.map((item: any) => (
              <Card
                key={item.id}
                className="border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors mb-3">
                        {item.judul}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" /> {item.ketua}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {item.tahun}
                        </span>
                        <Badge
                          className={`text-xs ${
                            item.status === "aktif"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
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