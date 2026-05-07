"use client";

import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const kontakInfo = [
  {
    icon: MapPin,
    label: "Alamat",
    value: "Jl. Serayu No.84, Madiun, Jawa Timur 63133",
    color: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/30",
  },
  {
    icon: Phone,
    label: "Telepon",
    value: "(0351) 452970",
    color: "from-indigo-500 to-blue-400",
    glow: "shadow-indigo-500/30",
  },
  {
    icon: Mail,
    label: "Email",
    value: "p3m@pnm.ac.id",
    color: "from-sky-500 to-blue-400",
    glow: "shadow-sky-500/30",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Senin – Jumat, 08.00 – 16.00 WIB",
    color: "from-blue-600 to-indigo-400",
    glow: "shadow-blue-600/30",
  },
];

/* ─────────────────────────────────────────────
   PARTICLE TYPE
───────────────────────────────────────────── */
type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
   Math.random() HANYA di dalam useEffect
   supaya tidak terjadi SSR hydration mismatch
───────────────────────────────────────────── */
function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 5,
        drift: Math.random() * 20 - 10,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-300/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, p.drift, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED GRID LINES
───────────────────────────────────────────── */
function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-full"
          style={{ top: `${(i + 1) * 16}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: i * 0.15, ease: "easeOut" }}
        />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-blue-300 to-transparent h-full"
          style={{ left: `${(i + 1) * 12}%` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: i * 0.1 + 0.5, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAGNETIC CONTACT CARD
───────────────────────────────────────────── */
function ContactCard({
  item,
  index,
}: {
  item: (typeof kontakInfo)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.21, 1.04, 0.58, 1],
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer"
    >
      <Card
        className={`
          border-0 relative overflow-hidden transition-all duration-300
          bg-white/80 backdrop-blur-sm
          ${hovered ? `shadow-2xl ${item.glow}` : "shadow-md shadow-blue-100/50"}
        `}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        <motion.div
          className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.3 }}
        />

        <CardContent className="flex items-start gap-4 p-6" style={{ transform: "translateZ(20px)" }}>
          <motion.div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <item.icon className="w-5 h-5 text-white" />
          </motion.div>

          <div>
            <motion.p
              className="text-xs font-bold text-blue-500 uppercase tracking-[0.15em] mb-1"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.4 }}
            >
              {item.label}
            </motion.p>
            <motion.p
              className="text-slate-700 font-semibold leading-snug"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.5 }}
            >
              {item.value}
            </motion.p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STAT BADGE
───────────────────────────────────────────── */
function StatBadge({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.21, 1.04, 0.58, 1] }}
      className="flex flex-col items-center gap-1"
    >
      <span className="text-2xl font-black text-white">{value}</span>
      <span className="text-xs text-blue-300 uppercase tracking-widest">{label}</span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function HubungiPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Typewriter
  const fullText = "Hubungi Kami";
  const [displayText, setDisplayText] = useState("");
  const [charIdx, setCharIdx] = useState(0);
  useEffect(() => {
    if (charIdx < fullText.length) {
      const t = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[charIdx]);
        setCharIdx((i) => i + 1);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [charIdx]);

  // Year — client only supaya tidak hydration mismatch
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <main className="relative min-h-screen bg-slate-50 overflow-x-hidden">
      <Navbar />

      {/* ══════════════ HERO ══════════════ */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 overflow-hidden"
      >
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <FloatingParticles />
        <GridLines />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge className="mb-6 bg-blue-400/10 text-blue-200 border border-blue-400/30 text-xs tracking-[0.2em] uppercase px-5 py-1.5 backdrop-blur-sm">
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"
              />
              Kontak
            </Badge>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-12 bg-blue-300 ml-1 align-middle"
            />
          </motion.h1>

          <motion.p
            className="text-blue-200 max-w-xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            Kami siap membantu. Jangan ragu untuk menghubungi kami kapan saja.
          </motion.p>

          <motion.div
            className="flex justify-center gap-12 mt-12 pt-12 border-t border-blue-700/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <StatBadge value="5+" label="Tahun" delay={1.6} />
            <div className="w-px bg-blue-700" />
            <StatBadge value="200+" label="Penelitian" delay={1.7} />
            <div className="w-px bg-blue-700" />
            <StatBadge value="24/7" label="Dukungan" delay={1.8} />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <motion.svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <path
              d="M0 60L60 50C120 40 240 20 360 16.7C480 13.3 600 26.7 720 30C840 33.3 960 26.7 1080 23.3C1200 20 1320 20 1380 20L1440 20V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
              fill="#f8fafc"
            />
          </motion.svg>
        </div>
      </section>

      {/* ══════════════ CONTENT ══════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-3"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <span className="text-xs font-bold text-blue-500 uppercase tracking-[0.2em]">Info Kontak</span>
            <motion.div
              className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </motion.div>
          <h2 className="text-3xl font-black text-slate-800">Temukan Kami di Sini</h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {kontakInfo.map((item, i) => (
            <ContactCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* ══════════════ MAP ══════════════
            ATURAN PENTING:
            1. Wrapper motion TIDAK boleh pakai filter (blur) — memblokir iframe render
            2. Wrapper TIDAK boleh pakai will-change: transform pada parent langsung iframe
            3. iframe harus di dalam div biasa, bukan motion.div langsung
        ════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.21, 1.04, 0.58, 1] }}
        >
          {/* Map label */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md shadow-blue-500/30"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <MapPin className="w-4 h-4 text-white" />
            </motion.div>
            <div>
              <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">Lokasi</p>
              <p className="text-sm text-slate-600 font-medium">Politeknik Negeri Madiun</p>
            </div>
          </div>

          {/* Border gradient pakai padding trick — TANPA overflow-hidden di level ini
              supaya iframe tidak ter-clip oleh stacking context baru */}
          <div
            className="rounded-2xl shadow-xl shadow-blue-200/40"
            style={{
              padding: 2,
              background: "linear-gradient(135deg, #3b82f6, #06b6d4, #6366f1)",
            }}
          >
            {/* Div ini yang boleh overflow-hidden — langsung parent iframe */}
            <div className="rounded-[14px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.329589950511!2d111.52637399999999!3d-7.6476630000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79be55b03d3d8f%3A0x1151682f4c35e5b4!2sPoliteknik%20Negeri%20Madiun!5e0!3m2!1sid!2sid!4v1778110163984!5m2!1sid!2sid"
                width="100%"
                height="400"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}