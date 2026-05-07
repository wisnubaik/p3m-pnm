"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Inovasi", "Estetika", "Presisi", "Masa Depan"];

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (index < words.length) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 800); // Kecepatan pergantian kata
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setIsFinished(true), 500);
    }
  }, [index]);

  // Varian untuk animasi teks
  const textVariants = {
    initial: { y: 100, opacity: 0, rotateX: -90 },
    animate: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      y: -100, 
      opacity: 0, 
      rotateX: 90,
      transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } 
    },
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFinished && (
        <motion.div
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ 
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1], delay: 0.2 } 
          }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white"
        >
          <div className="overflow-hidden h-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={words[index]}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase italic"
              >
                {words[index]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Progress Bar Halus di Bagian Bawah */}
          <motion.div 
            className="absolute bottom-10 left-0 h-[1px] bg-white/30"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: (words.length * 0.8) + 0.5, ease: "linear" }}
          />
          
          <div className="absolute bottom-12 text-[10px] tracking-[0.5em] uppercase opacity-50">
            System Loading
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}