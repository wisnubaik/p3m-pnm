import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  Award,
  FileText,
  ArrowRight,
  Bell,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: BookOpen, label: "Penelitian Aktif", value: "124" },
  { icon: Users, label: "Dosen Peneliti", value: "87" },
  { icon: Award, label: "Pengabdian Selesai", value: "312" },
  { icon: FileText, label: "Publikasi", value: "56" },
];

const pengumuman = [
  {
    tag: "Penelitian",
    judul: "Batas Akhir Pengumpulan Proposal Penelitian Internal 2025",
    tanggal: "3 Mei 2025",
  },
  {
    tag: "PKM",
    judul: "Pembukaan Pendaftaran PKM Unggulan Semester Genap 2025",
    tanggal: "28 Apr 2025",
  },
  {
    tag: "Semhas",
    judul: "Jadwal Seminar Hasil Penelitian Kompetitif Internal 2025",
    tanggal: "20 Apr 2025",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        {/* Background decorative circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-300/10 translate-y-1/2 -translate-x-1/4 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs tracking-widest uppercase px-4 py-1">
            Politeknik Negeri Madiun
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Pusat Penelitian &{" "}
            <span className="text-blue-300">Pengabdian</span>
            <br />
            kepada Masyarakat
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Mendorong inovasi, kolaborasi, dan kontribusi nyata melalui
            penelitian berkualitas dan pengabdian yang berdampak.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-lg"
            >
              <Link href="/penelitian/internal">
                Lihat Penelitian <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-blue-300 text-white hover:bg-blue-800 bg-transparent"
            >
              <Link href="/informasi/pengumuman">Pengumuman</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="shadow-lg border border-blue-100 hover:shadow-blue-100 transition-shadow"
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-900">{stat.value}</p>
                <p className="text-xs text-slate-500 leading-tight">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pengumuman Terbaru */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">
              Terkini
            </p>
            <h2 className="text-2xl font-bold text-slate-900">
              Pengumuman Terbaru
            </h2>
          </div>
          <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-800">
            <Link href="/informasi/pengumuman">
              Lihat Semua <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4">
          {pengumuman.map((item, i) => (
            <Card
              key={i}
              className="border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                      {item.tag}
                    </Badge>
                    <span className="text-xs text-slate-400">{item.tanggal}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors truncate">
                    {item.judul}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-blue-200 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-bold text-white text-lg mb-1">P3M — Politeknik Negeri Madiun</p>
          <p className="text-sm text-blue-400">
            Pusat Penelitian dan Pengabdian kepada Masyarakat
          </p>
          <p className="text-xs text-blue-600 mt-6">
            © {new Date().getFullYear()} P3M PNM. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}