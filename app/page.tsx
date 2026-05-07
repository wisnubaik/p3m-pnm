"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight, ChevronRight, BookOpen,
  Users, Award, FileText, Target, Eye,
  Lightbulb, Globe, Cpu, TrendingUp, Wrench,
  ShieldCheck, Handshake,
} from "lucide-react";
import Link from "next/link";
import {
  motion, AnimatePresence, Variants,
  useInView, useMotionValue, useSpring,
  useScroll, useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Footer from "@/components/Footer";

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─── Particle Canvas ───────────────────────────────────────────────────────────

function ParticleCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let id: number;
    interface P { x: number; y: number; vx: number; vy: number; r: number; a: number }
    let pts: P[] = [], W = 0, H = 0;
    const init = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      pts = Array.from({ length: Math.floor((W * H) / 11000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.36, vy: (Math.random() - 0.5) * 0.36,
        r: Math.random() * 1.5 + 0.3, a: Math.random() * 0.5 + 0.08,
      }));
    };
    init();
    const ro = new ResizeObserver(init); ro.observe(canvas);
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${p.a})`; ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(59,130,246,${0.2 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
}

// ─── Intro Screen ──────────────────────────────────────────────────────────────

function IntroScreen({ onDone }: { onDone: () => void }) {
  const [out, setOut] = useState(false);
  const dismiss = useCallback(() => {
    if (out) return; setOut(true); setTimeout(onDone, 900);
  }, [out, onDone]);
  useEffect(() => { const t = setTimeout(dismiss, 3500); return () => clearTimeout(t); }, [dismiss]);

  return (
    <AnimatePresence>
      {!out && (
        <motion.div key="intro"
          className="fixed inset-0 z-[9999] bg-[#020817] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}>
          <ParticleCanvas />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600 blur-[120px] pointer-events-none" />
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.15, 0.07] }}
            transition={{ duration: 11, repeat: Infinity, delay: 3 }}
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-300 blur-[100px] pointer-events-none" />

          <motion.button onClick={dismiss} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute top-6 right-6 z-20 border border-blue-900/80 text-blue-400 text-[11px]
                       px-4 py-2 rounded-full hover:border-blue-500 hover:bg-blue-950/60
                       transition-all tracking-[2px] backdrop-blur-sm">
            SKIP ↗
          </motion.button>

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-24 h-24 mb-8">
              <motion.svg animate={{ rotate: 360 }} transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0" viewBox="0 0 96 96" fill="none">
                <circle cx="48" cy="48" r="45" stroke="#1d4ed8" strokeWidth="1"
                  strokeDasharray="9 7" strokeLinecap="round" />
              </motion.svg>
              <motion.svg animate={{ rotate: -360 }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[8px]" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="37" stroke="#60a5fa" strokeWidth="0.8"
                  strokeDasharray="5 10" strokeLinecap="round" />
              </motion.svg>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-[16px] rounded-full bg-gradient-to-br from-blue-700 to-blue-500
                           flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <span className="text-white font-bold text-sm tracking-wider">P3M</span>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-center">
              <h1 className="text-white text-3xl font-bold tracking-tight">Politeknik Negeri Madiun</h1>
              <p className="text-blue-300 text-[11px] tracking-[4px] uppercase mt-2">
                Pusat Penelitian & Pengabdian Masyarakat
              </p>
            </motion.div>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={{ originX: 0.5 }}
              className="w-52 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent my-6" />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
              className="text-blue-400 text-[11px] tracking-[3px] uppercase">
              Inovasi · Kolaborasi · Dampak
            </motion.p>
          </div>

          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-52 text-center">
            <p className="text-blue-900 text-[10px] tracking-[2px] uppercase mb-3 animate-pulse">Memuat sistem</p>
            <div className="h-[2px] bg-blue-950 rounded-full overflow-hidden">
              <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 2.6, ease: [0.4, 0, 0.2, 1] }}
                className="h-full bg-gradient-to-r from-blue-700 via-blue-400 to-blue-300 rounded-full" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Animated Counter ──────────────────────────────────────────────────────────

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 16 });
  useEffect(() => { if (inView) mv.set(target); }, [inView, mv, target]);
  useEffect(() =>
    spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    }), [spring, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ─── Parallax Hook ────────────────────────────────────────────────────────────

function useParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  return {
    ref,
    y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
    opacity: useTransform(scrollYProgress, [0, 0.75], [1, 0]),
  };
}

// ─── Data — ASLI dari website resmi P3M PNM ───────────────────────────────────

const stats = [
  { icon: BookOpen,  label: "Penelitian Aktif",   value: 124, suffix: "",  grad: "from-blue-700 to-blue-500" },
  { icon: Users,     label: "Dosen Peneliti",      value: 87,  suffix: "+", grad: "from-blue-800 to-blue-600" },
  { icon: Award,     label: "Pengabdian Selesai",  value: 312, suffix: "",  grad: "from-blue-600 to-blue-400" },
  { icon: FileText,  label: "Publikasi Ilmiah",    value: 56,  suffix: "",  grad: "from-blue-900 to-blue-700" },
];

const fokusRiset = [
  {
    icon: Globe, nomor: "01",
    judul: "Transportasi Berkelanjutan",
    deskripsi: "Sustainable Transportation — riset inovatif untuk mendukung sistem mobilitas yang efisien, ramah lingkungan, dan berdaya saing nasional.",
  },
  {
    icon: Cpu, nomor: "02",
    judul: "Teknologi Informasi & Digitalisasi Industri",
    deskripsi: "Pengembangan teknologi digital yang mendorong transformasi industri dan penguatan ekosistem digital nasional.",
  },
  {
    icon: TrendingUp, nomor: "03",
    judul: "Bisnis, Ekonomi Kreatif & UMKM",
    deskripsi: "Penelitian yang memperkuat daya saing usaha mikro kecil menengah dan mendorong pertumbuhan ekonomi kreatif lokal.",
  },
  {
    icon: Wrench, nomor: "04",
    judul: "Teknologi Tepat Guna & Pemberdayaan Masyarakat",
    deskripsi: "Inovasi berbasis kebutuhan komunitas nyata — solusi praktis, terukur, dan berkelanjutan untuk masyarakat.",
  },
];

const layanan = [
  { icon: BookOpen,    judul: "Penelitian Internal",   href: "/penelitian/internal",        desc: "Proposal & monitoring penelitian yang didanai institusi secara terpusat." },
  { icon: Globe,       judul: "Pengabdian Masyarakat", href: "/pkm/internal",               desc: "Kegiatan PKM terstruktur, berdampak, dan berbasis potensi lokal." },
  { icon: FileText,    judul: "Publikasi & Luaran",    href: "/informasi/luaran",           desc: "Repository publikasi ilmiah dosen & mahasiswa terintegrasi." },
  { icon: Award,       judul: "Kekayaan Intelektual",  href: "/ki",                         desc: "Pendaftaran dan pengelolaan HKI hasil riset civitas akademika PNM." },
  { icon: ShieldCheck, judul: "Monitoring & Evaluasi", href: "/monev",                      desc: "Penilaian Monev berbasis indikator mutu yang transparan dan akuntabel." },
  { icon: Handshake,   judul: "Mitra & Kerjasama",     href: "/informasi/mitra-kerjasama",  desc: "Jaringan kolaborasi riset nasional & internasional untuk peluang pendanaan." },
];

const misi = [
  "Meningkatkan kapasitas dan kompetensi dosen serta mahasiswa dalam melaksanakan penelitian terapan bermutu sesuai kaidah ilmiah dan perkembangan teknologi.",
  "Menghasilkan penelitian terapan yang berorientasi pada inovasi, produk, prototipe, dan HKI guna mendukung daya saing institusi dan sektor industri.",
  "Mengembangkan model PKM yang berkelanjutan, berbasis potensi lokal, kebutuhan masyarakat, dan kolaborasi dengan pemerintah daerah serta mitra industri.",
  "Meningkatkan kemitraan penelitian dan PkM di tingkat nasional maupun internasional untuk memperluas jaringan kolaborasi dan peluang pendanaan.",
  "Mendorong pemanfaatan hasil penelitian dalam proses pembelajaran dan hilirisasi, sehingga menghasilkan inovasi yang memberi manfaat nyata bagi masyarakat.",
  "Mengembangkan sistem tata kelola penelitian dan PkM yang transparan, akuntabel, dan berbasis digital sesuai standar penjaminan mutu pendidikan tinggi.",
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [ready, setReady] = useState(false);
  const { ref: heroRef, y: heroY, opacity: heroOp } = useParallax();

  return (
    <>
      {!ready && <IntroScreen onDone={() => setReady(true)} />}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-white overflow-x-hidden"
      >
        <Navbar />

        {/* ══════════════════════════════════════════════════════════════════
            HERO — centered, elegan, profesional
        ══════════════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden
                     bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700"
        >
          <ParticleCanvas />

          {/* Ambient blobs */}
          <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-[650px] h-[650px] rounded-full bg-blue-500
                       -translate-y-1/2 translate-x-1/3 blur-[130px] pointer-events-none" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.15, 0.07] }}
            transition={{ duration: 11, repeat: Infinity, delay: 2.5 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-300
                       translate-y-1/2 -translate-x-1/4 blur-[100px] pointer-events-none" />

          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
              backgroundSize: "52px 52px",
            }} />

          {/* Bottom white fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

          {/* Hero content */}
          <motion.div style={{ y: heroY, opacity: heroOp }} className="relative z-[5] w-full">
            <motion.div
              variants={stagger} initial="hidden" animate={ready ? "visible" : "hidden"}
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32"
            >
              {/* Eyebrow badge */}
              <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-7">
                <span className="inline-flex items-center gap-2.5 bg-blue-500/15 border border-blue-400/25
                                  text-blue-200 text-[11px] tracking-[3px] uppercase px-5 py-2 rounded-full backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
                  Politeknik Negeri Madiun
                </span>
              </motion.div>

              {/* Main title — 3 baris, center, elegan */}
              <motion.h1 variants={fadeUp} custom={1}
                className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold text-white
                           leading-[1.08] tracking-tight mb-2">
                Pusat Penelitian
              </motion.h1>

              <motion.div variants={fadeUp} custom={2} className="relative inline-block mb-2">
                <span className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold text-blue-300 tracking-tight">
                  &amp; Pengabdian
                </span>
                {/* Animated underline */}
                <motion.span
                  initial={{ scaleX: 0 }} animate={ready ? { scaleX: 1 } : {}}
                  transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px]
                             bg-gradient-to-r from-blue-400 via-blue-300 to-transparent rounded-full" />
              </motion.div>

              <motion.h1 variants={fadeUp} custom={3}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white/70
                           tracking-tight mb-10">
                kepada Masyarakat
              </motion.h1>

              {/* Thin divider */}
              <motion.div variants={fadeUp} custom={4} className="flex justify-center mb-8">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
              </motion.div>

              {/* Sub-description */}
              <motion.p variants={fadeUp} custom={5}
                className="text-blue-200/80 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Mengkoordinasikan, memantau, mengevaluasi, dan meningkatkan mutu kegiatan
                penelitian serta pengabdian masyarakat oleh dosen dan mahasiswa PNM.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={6} className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 font-semibold
                             shadow-[0_0_40px_rgba(255,255,255,0.12)]
                             hover:scale-[1.03] active:scale-[0.98] transition-all duration-200
                             px-8 rounded-xl h-12">
                  <Link href="/penelitian/internal">
                    Lihat Penelitian <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline"
                  className="border-blue-400/30 text-white hover:bg-blue-800/40 bg-white/5
                             backdrop-blur-sm hover:scale-[1.03] active:scale-[0.98]
                             transition-all duration-200 px-8 rounded-xl h-12">
                  <Link href="/profil-p3m">Profil P3M</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            STATS — countdown animasi
        ══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
          <motion.div variants={stagger} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} custom={i}
                whileHover={{ y: -7, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}>
                <Card className="shadow-xl border border-blue-100 h-full overflow-hidden group">
                  <CardContent className="flex flex-col items-center justify-center p-7 text-center gap-3 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${s.grad}
                                    opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />
                    <motion.div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.grad}
                                            flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 12, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}>
                      <s.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <p className="text-4xl font-bold text-blue-950 tabular-nums leading-none">
                      <Counter target={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-xs text-slate-500 font-medium leading-tight">{s.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            PROFIL — Visi & Misi resmi P3M
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} className="text-center mb-16">
              <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-[3px] mb-3">Tentang Kami</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-5">Profil P3M PNM</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
                P3M-PNM merupakan unsur pelaksana yang bertugas mengkoordinasikan, memantau, mengevaluasi,
                mengembangkan dan meningkatkan mutu pelaksanaan kegiatan penelitian dan pengabdian
                masyarakat yang diselenggarakan oleh dosen dan mahasiswa.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Visi */}
              <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible"
                viewport={{ once: true }}>
                <Card className="h-full border-0 shadow-xl overflow-hidden group">
                  <div className="h-1.5 bg-gradient-to-r from-blue-700 to-blue-400" />
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center
                                      group-hover:bg-blue-600 transition-colors duration-300">
                        <Eye className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-[11px] text-blue-400 uppercase tracking-[2px] font-semibold">Visi</p>
                        <h3 className="font-bold text-slate-800 text-lg">Arah Tujuan</h3>
                      </div>
                    </div>
                    <blockquote className="text-slate-600 leading-relaxed text-base italic
                                           border-l-2 border-blue-200 pl-5">
                      "Menjadi pusat penelitian terapan dan pengabdian kepada masyarakat yang inovatif,
                      berkelanjutan, dan berdaya saing global berbasis teknologi dan kebutuhan industri."
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Misi */}
              <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible"
                viewport={{ once: true }}>
                <Card className="h-full border-0 shadow-xl overflow-hidden group">
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-300" />
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center
                                      group-hover:bg-blue-600 transition-colors duration-300">
                        <Target className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-[11px] text-blue-400 uppercase tracking-[2px] font-semibold">Misi</p>
                        <h3 className="font-bold text-slate-800 text-lg">Langkah Strategis</h3>
                      </div>
                    </div>
                    <motion.ul variants={stagger} initial="hidden" whileInView="visible"
                      viewport={{ once: true }} className="space-y-3">
                      {misi.map((m, i) => (
                        <motion.li key={i} variants={fadeUp} custom={i}
                          className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                          {m}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            4 FOKUS RISET — dari Renstra P3M
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} className="text-center mb-14">
              <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-[3px] mb-3">Renstra P3M</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                4 Bidang Fokus Riset
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
                Roadmap penelitian institusi mencakup 4 klaster riset utama yang dijalankan
                lintas program studi tata niaga dan rekayasa.
              </p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {fokusRiset.map((f, i) => (
                <motion.div key={f.nomor} variants={fadeUp} custom={i}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Card className="h-full border border-slate-100 hover:border-blue-200
                                   hover:shadow-[0_8px_40px_rgba(59,130,246,0.1)]
                                   transition-all duration-300 overflow-hidden group">
                    <CardContent className="p-6 flex flex-col gap-4 h-full">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center
                                        group-hover:bg-blue-600 transition-colors duration-300">
                          <f.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="text-3xl font-black text-blue-100 group-hover:text-blue-200
                                         transition-colors leading-none select-none">{f.nomor}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 mb-2 text-sm leading-snug
                                       group-hover:text-blue-700 transition-colors">{f.judul}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed">{f.deskripsi}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            LAYANAN SISTEM
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} className="text-center mb-14">
              <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-[3px] mb-3">Portal Sistem</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                Akses Layanan P3M
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
                Platform terpadu untuk mengelola seluruh ekosistem penelitian, pengabdian,
                dan publikasi civitas akademika PNM.
              </p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {layanan.map((l, i) => (
                <motion.div key={l.judul} variants={fadeUp} custom={i}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                  <Link href={l.href} className="block h-full group">
                    <Card className="h-full border border-slate-100 hover:border-blue-200
                                     hover:shadow-[0_6px_32px_rgba(59,130,246,0.1)]
                                     transition-all duration-300 overflow-hidden">
                      <CardContent className="p-6 flex flex-col gap-4 h-full">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center
                                        group-hover:bg-blue-600 transition-colors duration-300">
                          <l.icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 mb-1.5 text-sm
                                         group-hover:text-blue-700 transition-colors">{l.judul}</h3>
                          <p className="text-slate-500 text-xs leading-relaxed">{l.desc}</p>
                        </div>
                        <div className="flex items-center gap-1 text-blue-500 text-xs font-semibold
                                        group-hover:gap-2 transition-all duration-200">
                          Buka <ChevronRight className="w-3 h-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════════════════════════════ */}
        <section className="py-10 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }}>
              <div className="relative overflow-hidden rounded-3xl
                              bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700 p-12 sm:p-14">
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.18, 0.32, 0.18] }}
                  transition={{ duration: 7, repeat: Infinity }}
                  className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-400
                             -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 9, repeat: Infinity, delay: 2 }}
                  className="absolute bottom-0 left-20 w-48 h-48 rounded-full bg-blue-300
                             translate-y-1/2 blur-3xl pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
                    backgroundSize: "40px 40px",
                  }} />
                <div className="relative z-10 flex flex-col lg:flex-row items-center
                                justify-between gap-8 text-center lg:text-left">
                  <div>
                    <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                      <Lightbulb className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-300 text-[11px] tracking-[2px] uppercase font-semibold">
                        Mulai Berkontribusi
                      </span>
                    </div>
                    <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                      Ajukan Proposal Penelitian<br className="hidden sm:block" /> atau PKM Anda
                    </h3>
                    <p className="text-blue-200/80 text-sm leading-relaxed max-w-lg">
                      Bersama P3M-PNM, wujudkan inovasi terapan yang memberi manfaat nyata
                      bagi masyarakat dan industri. Kami siap mendampingi setiap langkah riset Anda.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                    <Button asChild size="lg"
                      className="bg-white text-blue-900 hover:bg-blue-50 font-semibold
                                 hover:scale-[1.03] active:scale-[0.97] transition-all
                                 px-7 rounded-xl whitespace-nowrap">
                      <Link href="/penelitian/internal">
                        Penelitian Internal <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline"
                      className="border-blue-400/30 text-white hover:bg-blue-800/40 bg-white/5
                                 backdrop-blur-sm hover:scale-[1.03] active:scale-[0.97]
                                 transition-all px-7 rounded-xl whitespace-nowrap">
                      <Link href="/pkm/internal">PKM Internal</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </motion.main>
    </>
  );
}