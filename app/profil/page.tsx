import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, CheckCircle } from "lucide-react";

const tugasFungsi = [
  "Menyusun rencana dan program penelitian serta pengabdian kepada masyarakat",
  "Mengkoordinasikan kegiatan penelitian dan pengabdian kepada masyarakat",
  "Mengelola administrasi penelitian dan pengabdian kepada masyarakat",
  "Mendokumentasikan dan mempublikasikan hasil penelitian dan pengabdian",
  "Memfasilitasi perolehan HKI atas hasil penelitian sivitas akademika",
  "Melakukan monitoring dan evaluasi pelaksanaan penelitian dan pengabdian",
];

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs tracking-widest uppercase px-4 py-1">
            Tentang Kami
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Profil P3M
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto text-lg">
            Politeknik Negeri Madiun
          </p>
        </div>
      </section>

      {/* Konten */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Tentang */}
        <div className="mb-16">
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-2">Tentang</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Apa itu P3M?</h2>
          <p className="text-slate-600 leading-relaxed">
            Pusat Penelitian dan Pengabdian kepada Masyarakat (P3M) Politeknik Negeri Madiun
            adalah unit yang bertanggung jawab dalam mengelola, mengkoordinasikan, dan
            mengembangkan kegiatan penelitian serta pengabdian kepada masyarakat di lingkungan
            Politeknik Negeri Madiun. P3M berkomitmen untuk mendorong terciptanya inovasi
            yang berdampak nyata bagi masyarakat dan kemajuan ilmu pengetahuan.
          </p>
        </div>

        {/* Visi Misi */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Card className="border border-blue-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Visi</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                Menjadi pusat penelitian dan pengabdian kepada masyarakat yang unggul,
                inovatif, dan berdaya saing tinggi dalam mendukung pembangunan nasional
                berbasis teknologi terapan.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-blue-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Misi</h3>
              </div>
              <ul className="text-slate-600 text-sm space-y-2">
                <li className="flex gap-2"><span className="text-blue-400 mt-0.5">•</span> Mendorong penelitian terapan yang relevan dengan kebutuhan industri dan masyarakat</li>
                <li className="flex gap-2"><span className="text-blue-400 mt-0.5">•</span> Meningkatkan kualitas dan kuantitas publikasi ilmiah sivitas akademika</li>
                <li className="flex gap-2"><span className="text-blue-400 mt-0.5">•</span> Memfasilitasi kegiatan pengabdian yang berdampak nyata bagi masyarakat</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Tugas & Fungsi */}
        <div>
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-2">Tugas & Fungsi</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Yang Kami Lakukan</h2>
          <div className="grid gap-3">
            {tugasFungsi.map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
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