"use client";

import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

type Kegiatan = {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  lokasi: string;
};

export default function KegiatanPage() {
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("kegiatan").select("*").order("tanggal", { ascending: false })
      .then(({ data }) => { setKegiatan(data ?? []); setLoading(false); });
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-400 -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none"
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge className="mb-4 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs tracking-widest uppercase px-4 py-1">
              Informasi
            </Badge>
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Kegiatan
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-blue-200 max-w-xl mx-auto text-lg">
            Agenda dan kegiatan P3M Politeknik Negeri Madiun
          </motion.p>
        </motion.div>
      </section>

      {/* Konten */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : kegiatan.length === 0 ? (
          <p className="text-center text-slate-400">Belum ada kegiatan.</p>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-4"
          >
            {kegiatan.map((item, i) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ x: 6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group">
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <Footer />
    </main>
  );
}