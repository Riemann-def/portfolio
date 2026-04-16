"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const word = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.645, 0.045, 0.355, 1] } },
};

export default function EnzoHero() {
  // Mouse parallax — the portrait drifts a few pixels with the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { damping: 30, stiffness: 80 });
  const py = useSpring(my, { damping: 30, stiffness: 80 });
  const portraitX = useTransform(px, [-1, 1], [-16, 16]);
  const portraitY = useTransform(py, [-1, 1], [-12, 12]);
  const ringX = useTransform(px, [-1, 1], [24, -24]);
  const ringY = useTransform(py, [-1, 1], [18, -18]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section id="top" className="enzo-hero">
      <div className="enzo-hero-text">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="enzo-item-label"
            style={{ position: "static" }}
          >
            Software Engineer · LLMs & AI
          </motion.span>
          <motion.h1 variants={container} initial="hidden" animate="visible">
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span style={{ display: "inline-block" }} variants={word}>Hi, I&rsquo;m</motion.span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span style={{ display: "inline-block" }} variants={word}>
                Markel <span className="italic">Ramiro</span>.
              </motion.span>
            </span>
          </motion.h1>
          <motion.p
            className="text-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.645, 0.045, 0.355, 1] }}
            style={{ maxWidth: "42ch", opacity: 0.75 }}
          >
            Software Engineer at <span className="italic">Multiverse Computing</span>, working on
            LLM compression. I care about making large language models smaller,
            faster, and actually useful. Madrid, Spain.
          </motion.p>
        </div>
      </div>
      <div className="enzo-hero-media">
        <div className="enzo-hero-blob" aria-hidden="true" />
        <motion.div
          className="enzo-hero-portrait"
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1], delay: 0.3 }}
        >
          <motion.div
            className="enzo-hero-ring enzo-hero-ring--outer"
            aria-hidden="true"
            style={{ x: ringX, y: ringY }}
          />
          <motion.div
            className="enzo-hero-ring enzo-hero-ring--inner"
            aria-hidden="true"
            style={{ x: useTransform(px, [-1, 1], [-16, 16]), y: useTransform(py, [-1, 1], [-12, 12]) }}
          />
          <motion.div
            className="enzo-hero-portrait-frame"
            style={{ x: portraitX, y: portraitY }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          >
            <Image
              src="/perfil-markel-black.jpeg"
              alt="Markel Ramiro"
              fill
              priority
              sizes="(max-width: 860px) 70vw, 32vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
