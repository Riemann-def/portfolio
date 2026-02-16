'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

/* ─── Brand Data ──────────────────────────────────────────────── */

interface Brand {
  id: string;
  name: string;
  logo?: string;
  logoText?: string;
  color: string;
  gradient: string;
  role: string;
  period: string;
  type: 'experience' | 'education';
  description: string;
  highlights: string[];
  darkText?: boolean;
}

const brands: Brand[] = [
  {
    id: 'multiverse',
    name: 'Multiverse Computing',
    logo: '/multiverse-logo.png',
    color: '#DC2626',
    gradient: 'from-red-900 via-red-700 to-red-950',
    role: 'Software Engineer',
    period: '2025 — Present',
    type: 'experience',
    description:
      'Collaborating with a world-class team of Quantum and AI experts, solving high-value industry problems for Fortune 500 clients.',
    highlights: ['Quantum Computing', 'AI/ML', 'Python', 'AWS'],
  },
  {
    id: 'belasai',
    name: 'beLASAI',
    logo: '/logo-belasai.png',
    color: '#C598D1',
    gradient: 'from-[#8a4f9a] via-[#c466db] to-[#7a3f8a]',
    role: 'Full Stack Developer',
    period: '2024 — 2025',
    type: 'experience',
    description:
      'Built the web application for a grant-winning AI idea. My development work helped the project get accepted into Lanzadera, one of Spain\'s top startup accelerators in Valencia.',
    highlights: ['Grant Winner', 'Lanzadera', 'Full Stack', 'AI'],
  },
  {
    id: 'wippass',
    name: 'Wippass',
    logo: '/wippass-logo.png',
    color: '#2563EB',
    gradient: 'from-blue-950 via-blue-800 to-blue-950',
    role: 'Founder & Full Stack Developer',
    period: '2023 — 2024',
    type: 'experience',
    description:
      'Founded a ticketing platform that processed €25,000+ in transactions, with 7,000+ registered users and sold-out events.',
    highlights: ['Entrepreneurship', 'Full Stack', 'AWS', '€25K+ Revenue'],
  },
  {
    id: 'ehu',
    name: 'EHU/UPV',
    logo: '/ehu-logo-dark.svg',
    color: '#1a1a2e',
    gradient: 'from-white via-gray-50 to-white',
    role: 'B.Sc. in Artificial Intelligence',
    period: '2020 — 2024',
    type: 'education',
    description:
      'Member of the 1st graduating class of the AI program. Final project: Anomaly Detection with Kubernetes deployment — Grade 9/10.',
    highlights: ['1st AI Class', 'Deep Learning', 'Computer Vision', '9/10 TFG'],
    darkText: true,
  },
  {
    id: 'zrive',
    name: 'Zrive',
    logo: '/zrive-logo.svg',
    color: '#059669',
    gradient: 'from-emerald-950 via-emerald-800 to-emerald-950',
    role: 'Applied Data Science Program',
    period: '2025',
    type: 'education',
    description:
      '15-week intensive program with industry mentorship from Meta, Vodafone, and Revolut engineers. Real-world projects with enterprise data.',
    highlights: ['Data Science', 'ML Engineering', 'Industry Mentors', 'Real Projects'],
  },
];

/* ─── Particle Field (Canvas) ─────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const count = Math.min(70, Math.floor((w * h) / 18000));
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.25 + 0.08,
    }));

    const connectionDist = 140;
    let mouseX = -9999;
    let mouseY = -9999;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Mouse push
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160 && dist > 0) {
          const force = ((160 - dist) / 160) * 0.015;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Dampen
        p.vx *= 0.998;
        p.vy *= 0.998;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.07;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}

/* ─── Hero Section — Cinematic Typography ─────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.3 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

function HeroSection() {
  const firstName = 'MARKEL';
  const lastName = 'RAMIRO';

  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Particle field */}
      <ParticleField />

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Subtle center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[200px] opacity-[0.03] bg-white pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Profile photo — small, above the name */}
        <motion.div
          className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/10 mb-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/perfil-markel.jpg"
            alt="Markel Ramiro"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Name — dramatic cinematic typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center select-none"
        >
          {/* First name */}
          <div className="flex justify-center overflow-hidden">
            {firstName.split('').map((letter, i) => (
              <motion.span
                key={`f-${i}`}
                variants={letterVariants}
                className="inline-block text-[clamp(3.5rem,14vw,10rem)] font-bold tracking-[-0.03em] leading-[0.85]"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Last name */}
          <div className="flex justify-center overflow-hidden">
            {lastName.split('').map((letter, i) => (
              <motion.span
                key={`l-${i}`}
                variants={letterVariants}
                className="inline-block text-[clamp(3.5rem,14vw,10rem)] font-bold tracking-[-0.03em] leading-[0.85]"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-[11px] sm:text-xs md:text-sm text-white/25 tracking-[0.3em] uppercase font-light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Software Engineer · AI · Data Science
        </motion.p>

        {/* Brand strip — journey preview */}
        <motion.div
          className="mt-14 sm:mt-16 flex items-center justify-center gap-5 sm:gap-8 md:gap-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              className="flex flex-col items-center gap-2 group cursor-default"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${brand.color}0d`,
                  border: `1px solid ${brand.color}15`,
                }}
              >
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={22}
                    height={22}
                    className="rounded-sm opacity-60 group-hover:opacity-90 transition-opacity"
                  />
                ) : (
                  <span
                    className="text-[9px] sm:text-[10px] font-bold opacity-50 group-hover:opacity-80 transition-opacity"
                    style={{ color: brand.color }}
                  >
                    {brand.logoText}
                  </span>
                )}
              </div>
              <span className="text-[8px] tracking-[0.1em] text-white/0 group-hover:text-white/30 transition-colors duration-300 uppercase">
                {brand.id === 'ehu' ? 'EHU' : brand.id === 'belasai' ? 'beLAS' : brand.name.split(' ')[0]}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Brand Section (scroll-driven) ───────────────────────────── */

function BrandSection({ brand }: { brand: Brand }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Section-level fade
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.22, 0.72, 0.88],
    [0, 1, 1, 0],
  );

  // Logo entrance
  const logoScale = useTransform(scrollYProgress, [0.08, 0.28], [0.5, 1]);
  const logoOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);

  // Text entrance (slightly delayed)
  const textY = useTransform(scrollYProgress, [0.16, 0.32], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.16, 0.32], [0, 1]);

  // Tags entrance
  const tagsOpacity = useTransform(scrollYProgress, [0.24, 0.36], [0, 1]);

  return (
    <div ref={ref} id={brand.id} className="h-[160vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${brand.gradient}`}
          style={{ opacity: sectionOpacity }}
        />

        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        {/* Animated blob */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.12]"
          style={{ backgroundColor: brand.color }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-2xl mx-auto px-6 text-center"
          style={{ opacity: sectionOpacity }}
        >
          {/* Type badge */}
          <motion.div style={{ opacity: textOpacity, y: textY }}>
            <span className={`inline-block px-3 py-1 text-[10px] tracking-[0.25em] uppercase rounded-full mb-8 ${
              brand.darkText
                ? 'text-gray-500 border border-gray-300'
                : 'text-white/40 border border-white/10'
            }`}>
              {brand.type}
            </span>
          </motion.div>

          {/* Logo */}
          <motion.div
            className="flex justify-center mb-6"
            style={{ scale: logoScale, opacity: logoOpacity }}
          >
            {brand.logo ? (
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl backdrop-blur-sm flex items-center justify-center p-4 border ${
                brand.darkText
                  ? 'bg-gray-100 border-gray-200'
                  : 'bg-white/[0.08] border-white/[0.08]'
              }`}>
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={56}
                  height={56}
                  className="rounded-lg"
                />
              </div>
            ) : (
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl backdrop-blur-sm flex items-center justify-center border ${
                brand.darkText
                  ? 'bg-gray-100 border-gray-200'
                  : 'bg-white/[0.08] border-white/[0.08]'
              }`}>
                <span className={`text-2xl md:text-3xl font-bold ${brand.darkText ? 'text-gray-800' : 'text-white/90'}`}>
                  {brand.logoText}
                </span>
              </div>
            )}
          </motion.div>

          {/* Name */}
          <motion.h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 ${
              brand.darkText ? 'text-gray-900' : 'text-white'
            }`}
            style={{ opacity: textOpacity, y: textY }}
          >
            {brand.name}
          </motion.h2>

          {/* Role & Period */}
          <motion.div style={{ opacity: textOpacity, y: textY }}>
            <p className={`text-lg md:text-xl font-medium ${brand.darkText ? 'text-gray-700' : 'text-white/65'}`}>
              {brand.role}
            </p>
            <p className={`text-xs tracking-[0.2em] uppercase mt-1.5 ${brand.darkText ? 'text-gray-500' : 'text-white/30'}`}>
              {brand.period}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            className={`mt-8 text-base md:text-lg leading-relaxed max-w-xl mx-auto ${
              brand.darkText ? 'text-gray-600' : 'text-white/55'
            }`}
            style={{ opacity: textOpacity, y: textY }}
          >
            {brand.description}
          </motion.p>

          {/* Highlights */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-2"
            style={{ opacity: tagsOpacity }}
          >
            {brand.highlights.map((h) => (
              <span
                key={h}
                className={`px-3 py-1.5 rounded-full text-xs tracking-wide border ${
                  brand.darkText
                    ? 'bg-gray-100 text-gray-600 border-gray-300'
                    : 'bg-white/[0.06] text-white/50 border-white/[0.05]'
                }`}
              >
                {h}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Timeline Navigation ─────────────────────────────────────── */

function TimelineNav() {
  const [activeSection, setActiveSection] = useState('');
  const [visible, setVisible] = useState(false);

  // Track if we're on a light-background section (EHU)
  const onLightBg = activeSection === 'ehu';

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;

      // Show once user starts scrolling (even a little)
      setVisible(window.scrollY > vh * 0.15);

      // Determine active section
      let found = false;
      for (const brand of brands) {
        const el = document.getElementById(brand.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.5 && rect.bottom >= vh * 0.5) {
          setActiveSection(brand.id);
          found = true;
          break;
        }
      }
      if (!found && window.scrollY <= vh) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Colors adapt to light/dark background
  const inactiveDotColor = onLightBg ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)';
  const lineColor = onLightBg ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)';

  return (
    <motion.nav
      className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        {/* Vertical line — centered on the 12px dot column */}
        <div
          className="absolute left-[5.5px] top-2 bottom-2 w-px transition-colors duration-500"
          style={{ backgroundColor: lineColor }}
        />

        <div className="flex flex-col gap-5">
          {brands.map((brand) => {
            const isActive = activeSection === brand.id;
            const isEhu = brand.id === 'ehu';

            return (
              <button
                key={brand.id}
                onClick={() =>
                  document.getElementById(brand.id)?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center gap-3 group outline-none"
              >
                {/* Dot container — fixed 12px so dot stays centered on line */}
                <div className="w-3 h-3 flex items-center justify-center shrink-0">
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? 9 : 5,
                      height: isActive ? 9 : 5,
                      backgroundColor: isActive
                        ? isEhu ? '#374151' : brand.color
                        : inactiveDotColor,
                      boxShadow: isActive
                        ? `0 0 12px ${isEhu ? 'rgba(55,65,81,0.4)' : brand.color + '50'}`
                        : 'none',
                    }}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] tracking-[0.08em] whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? onLightBg
                        ? 'opacity-80 text-gray-600 translate-x-0'
                        : 'opacity-80 text-white/70 translate-x-0'
                      : onLightBg
                        ? 'opacity-0 group-hover:opacity-50 text-gray-500 -translate-x-1 group-hover:translate-x-0'
                        : 'opacity-0 group-hover:opacity-50 text-white/50 -translate-x-1 group-hover:translate-x-0'
                  }`}
                >
                  {brand.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}

/* ─── Contact Footer ──────────────────────────────────────────── */

function ContactFooter() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6">
          Get in touch
        </p>

        <a
          href="mailto:hola@markelramiro.com"
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-white hover:text-white/70 transition-colors duration-300"
        >
          hola@markelramiro.com
        </a>

        <div className="mt-12 flex items-center justify-center gap-6 sm:gap-8">
          <a
            href="https://github.com/Riemann-def"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-300 text-xs tracking-[0.15em] uppercase"
          >
            GitHub
          </a>
          <span className="text-white/20">·</span>
          <a
            href="https://www.linkedin.com/in/markel-ramiro-vaquero-92530319b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-300 text-xs tracking-[0.15em] uppercase"
          >
            LinkedIn
          </a>
          <span className="text-white/20">·</span>
          <a
            href="/Markel_Ramiro_Vaquero.pdf"
            download
            className="text-white/40 hover:text-white transition-colors duration-300 text-xs tracking-[0.15em] uppercase"
          >
            Resume
          </a>
        </div>

        <p className="mt-24 text-white/20 text-[10px] tracking-[0.2em] uppercase">
          Bilbao, Spain
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */

export default function ScrollPortfolio() {
  return (
    <main className="bg-[#050505]">
      <HeroSection />
      <TimelineNav />
      {brands.map((brand) => (
        <BrandSection key={brand.id} brand={brand} />
      ))}
      <ContactFooter />
    </main>
  );
}
