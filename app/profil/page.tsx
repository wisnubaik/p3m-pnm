"use client";

import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, CheckCircle, Sparkles, LucideIcon } from "lucide-react";
import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState, ReactNode, MouseEvent } from "react";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const tugasFungsi: string[] = [
  "Menyusun rencana dan program penelitian serta pengabdian kepada masyarakat",
  "Mengkoordinasikan kegiatan penelitian dan pengabdian kepada masyarakat",
  "Mengelola administrasi penelitian dan pengabdian kepada masyarakat",
  "Mendokumentasikan dan mempublikasikan hasil penelitian dan pengabdian",
  "Memfasilitasi perolehan HKI atas hasil penelitian sivitas akademika",
  "Melakukan monitoring dan evaluasi pelaksanaan penelitian dan pengabdian",
];

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeInOut" as const },
  }),
};

/* ─────────────────────────────────────────
   FLOATING ORBS
───────────────────────────────────────── */
interface OrbConfig {
  w: number;
  h: number;
  top: string;
  left: string;
  dur: number;
  color: string;
}

function FloatingOrbs() {
  const orbs: OrbConfig[] = [
    { w: 320, h: 320, top: "10%", left: "5%",  dur: 8,  color: "from-blue-500/20 to-cyan-400/10" },
    { w: 200, h: 200, top: "60%", left: "80%", dur: 12, color: "from-indigo-500/20 to-blue-300/10" },
    { w: 140, h: 140, top: "30%", left: "70%", dur: 6,  color: "from-sky-400/25 to-blue-600/10" },
    { w: 100, h: 100, top: "75%", left: "15%", dur: 10, color: "from-cyan-300/20 to-blue-500/10" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-2xl`}
          style={{ width: orb.w, height: orb.h, top: orb.top, left: orb.left }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   GRID DOTS
───────────────────────────────────────── */
function GridDots() {
  return (
    <div
      className="absolute inset-0 opacity-[0.07] pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, #93c5fd 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    />
  );
}

/* ─────────────────────────────────────────
   MAGNETIC CARD (3D tilt on hover)
───────────────────────────────────────── */
interface MagneticCardProps {
  children: ReactNode;
  className?: string;
}

function MagneticCard({ children, className }: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SCROLL-TRIGGERED REVEAL WRAPPER
───────────────────────────────────────── */
interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function RevealSection({ children, className, delay = 0 }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
interface AnimatedNumberProps {
  target: number;
  suffix?: string;
}

function AnimatedNumber({ target, suffix = "" }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState<number>(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setDisplay(current);
      if (current >= target) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────
   CARD DATA TYPE
───────────────────────────────────────── */
interface CardData {
  icon: LucideIcon;
  title: string;
  gradient: string;
  glow: string;
  content: ReactNode;
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function ProfilPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const cards: CardData[] = [
    {
      icon: Eye,
      title: "Visi",
      gradient: "from-blue-600 to-cyan-500",
      glow: "shadow-blue-200",
      content: (
        <p className="text-slate-600 leading-relaxed text-sm">
          Menjadi pusat penelitian dan pengabdian kepada masyarakat yang unggul,
          inovatif, dan berdaya saing tinggi dalam mendukung pembangunan nasional
          berbasis teknologi terapan.
        </p>
      ),
    },
    {
      icon: Target,
      title: "Misi",
      gradient: "from-indigo-600 to-blue-500",
      glow: "shadow-indigo-200",
      content: (
        <ul className="text-slate-600 text-sm space-y-2.5">
          {[
            "Mendorong penelitian terapan yang relevan dengan kebutuhan industri dan masyarakat",
            "Meningkatkan kualitas dan kuantitas publikasi ilmiah sivitas akademika",
            "Memfasilitasi kegiatan pengabdian yang berdampak nyata bagi masyarakat",
          ].map((m, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.3 }}
              className="flex gap-2"
            >
              <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
              {m}
            </motion.li>
          ))}
        </ul>
      ),
    },
  ];

  const stats: { val: number; suffix: string; label: string }[] = [
    { val: 120, suffix: "+", label: "Penelitian" },
    { val: 85,  suffix: "+", label: "Pengabdian" },
    { val: 40,  suffix: "+", label: "Publikasi"  },
  ];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 min-h-[520px] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f1c4d 0%, #1e3a8a 50%, #1d4ed8 100%)" }}
      >
        <GridDots />
        <FloatingOrbs />

        {/* Pulse rings */}
        <motion.div
          className="absolute rounded-full border border-blue-400/20"
          style={{ width: 500, height: 500, top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full border border-blue-400/10"
          style={{ width: 700, height: 700, top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.08, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className="mb-5 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs tracking-widest uppercase px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-1.5 inline-block" />
              Tentang Kami
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            Profil{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-cyan-300 via-blue-200 to-blue-400 bg-clip-text text-transparent">
                P3M
              </span>
              <motion.span
                className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-blue-200/80 text-lg font-medium tracking-wide"
          >
            Politeknik Negeri Madiun
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10 flex flex-wrap justify-center gap-8"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-white tabular-nums">
                  <AnimatedNumber target={s.val} suffix={s.suffix} />
                </p>
                <p className="text-blue-300 text-xs mt-1 tracking-widest uppercase">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── CONTENT ──────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">

        {/* TENTANG */}
        <RevealSection>
          <div className="relative pl-6 border-l-2 border-blue-200">
            <motion.div
              className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-2">Tentang</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-5">Apa itu P3M?</h2>
            <p className="text-slate-600 leading-relaxed text-base max-w-3xl">
              Pusat Penelitian dan Pengabdian kepada Masyarakat (P3M) Politeknik Negeri Madiun
              adalah unit yang bertanggung jawab dalam mengelola, mengkoordinasikan, dan
              mengembangkan kegiatan penelitian serta pengabdian kepada masyarakat di lingkungan
              Politeknik Negeri Madiun. P3M berkomitmen untuk mendorong terciptanya inovasi
              yang berdampak nyata bagi masyarakat dan kemajuan ilmu pengetahuan.
            </p>
          </div>
        </RevealSection>

        {/* VISI & MISI */}
        <div>
          <RevealSection className="mb-8">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-2">Arah & Tujuan</p>
            <h2 className="text-3xl font-bold text-slate-900">Visi & Misi</h2>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <MagneticCard key={i} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className={`h-full rounded-2xl border border-slate-100 bg-white shadow-lg ${card.glow} shadow-md transition-shadow duration-300 hover:shadow-xl overflow-hidden`}
                >
                  <div className={`h-1 w-full bg-gradient-to-r ${card.gradient}`} />
                  <div className="p-7">
                    <div className="flex items-center gap-4 mb-5">
                      <motion.div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-md`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <card.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                    </div>
                    {card.content}
                  </div>
                </motion.div>
              </MagneticCard>
            ))}
          </div>
        </div>

        {/* TUGAS & FUNGSI */}
        <div>
          <RevealSection className="mb-8">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-2">Tugas & Fungsi</p>
            <h2 className="text-3xl font-bold text-slate-900">Yang Kami Lakukan</h2>
          </RevealSection>

          <div className="grid gap-3">
            {tugasFungsi.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6, backgroundColor: "rgb(239 246 255)" }}
                className="group flex gap-4 items-start p-4 rounded-xl border border-slate-100 hover:border-blue-200 cursor-default transition-colors duration-200"
              >
                <motion.span
                  className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 text-blue-500 text-xs font-bold flex items-center justify-center border border-blue-100 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                <div className="flex items-start gap-3 flex-1">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5 group-hover:text-blue-600 transition-colors" />
                  <p className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}