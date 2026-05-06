import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

async function getDokumen() {
  const { data, error } = await supabase
    .from("dokumen")
    .select("*")
    .order("tahun", { ascending: false });

  if (error) return [];
  return data;
}

export default async function RepositoryPage() {
  const dokumen = await getDokumen();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs tracking-widest uppercase px-4 py-1">
            Dokumen
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Repository</h1>
          <p className="text-blue-200 max-w-xl mx-auto text-lg">
            Kumpulan dokumen, panduan, dan template P3M Politeknik Negeri Madiun
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {dokumen.length === 0 ? (
          <p className="text-center text-slate-400">Belum ada dokumen.</p>
        ) : (
          <div className="grid gap-4">
            {dokumen.map((item: any) => (
              <Card key={item.id} className="border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        {item.kategori}
                      </Badge>
                      <span className="text-xs text-slate-400">{item.tahun}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                      {item.judul}
                    </p>
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

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