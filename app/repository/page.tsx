"use client";

import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ExternalLink } from "lucide-react";
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

type Dokumen = {
  id: number;
  judul: string;
  kategori: string;
  url: string;
  tahun: number;
};

export default function RepositoryPage() {
  const [dokumen, setDokumen] = useState<Dokumen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("dokumen").select("*").order("tahun", { ascending: false })
      .then(({ data }) => { setDokumen(data ?? []); setLoading(false); });
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
              Dokumen
            </Badge>
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Repository
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-blue-200 max-w-xl mx-auto text-lg">
            Kumpulan dokumen, panduan, dan template P3M Politeknik Negeri Madiun
          </motion.p>
        </motion.div>
      </section>

      {/* Konten */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : dokumen.length === 0 ? (
          <p className="text-center text-slate-400">Belum ada dokumen.</p>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-4"
          >
            {dokumen.map((item, i) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ x: 6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-5">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.15, backgroundColor: "#dbeafe" }}
                    >
                      <FileText className="w-4 h-4 text-blue-500" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">{item.kategori}</Badge>
                        <span className="text-xs text-slate-400">{item.tahun}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                        {item.judul}
                      </p>
                    </div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <motion.div whileHover={{ scale: 1.2, rotate: -10 }} transition={{ type: "spring", stiffness: 400 }}>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </motion.div>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}