import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const kontakInfo = [
  {
    icon: MapPin,
    label: "Alamat",
    value: "Jl. Serayu No.84, Madiun, Jawa Timur 63133",
  },
  {
    icon: Phone,
    label: "Telepon",
    value: "(0351) 452970",
  },
  {
    icon: Mail,
    label: "Email",
    value: "p3m@pnm.ac.id",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Senin – Jumat, 08.00 – 16.00 WIB",
  },
];

export default function HubungiPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs tracking-widest uppercase px-4 py-1">
            Kontak
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Hubungi Kami
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto text-lg">
            Kami siap membantu. Jangan ragu untuk menghubungi kami.
          </p>
        </div>
      </section>

      {/* Konten */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {kontakInfo.map((item) => (
            <Card key={item.label} className="border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">
                    {item.label}
                  </p>
                  <p className="text-slate-700 font-medium">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Google Maps Embed */}
        <div className="rounded-2xl overflow-hidden border border-blue-100 shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.1!2d111.5!3d-7.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzYnMDAuMCJTIDExMcKwMzAnMDAuMCJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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