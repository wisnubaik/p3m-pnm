"use client";

import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, User, Calendar } from "lucide-react";
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

type Pkm = {
  id: number;
  judul: string;
  ketua: string;
  tahun: number;
  status: string;
};

export default function PkmEksternalPage() {
  const [pkm, setPkm] = useState<Pkm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("pkm").select("*").eq("jenis", "eksternal").order("tahun", { ascending: false })
      .then(({ data }) => { setPkm(data ?? []); setLoading(false); });
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <Navbar />

      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-400 -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-300 translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none"
        />
        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} custom={0}>
            <Badge className="mb-4 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs tracking-widest uppercase px-4 py-1">PKM</Badge>
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-bold text-white mb-4">PKM Eksternal</motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-blue-200 max-w-xl mx-auto text-lg">Daftar PKM eksternal sivitas akademika Politeknik Negeri Madiun</motion.p>
        </motion.div>
      </section>

      <section className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />)}
          </div>
        ) : pkm.length === 0 ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-slate-400">Belum ada data PKM.</motion.p>
        ) : (
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid gap-4">
            {pkm.map((item, i) => (
              <motion.div key={item.id} variants={fadeUp} custom={i} whileHover={{ x: 6, scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Card className="border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <motion.div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1" whileHover={{ scale: 1.15, backgroundColor: "#dbeafe" }}>
                        <BookOpen className="w-4 h-4 text-blue-500" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors mb-3">{item.judul}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><User className="w-3 h-3" /> {item.ketua}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.tahun}</span>
                          <Badge className={`text-xs ${item.status === "aktif" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{item.status}</Badge>
                        </div>
                      </div>
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