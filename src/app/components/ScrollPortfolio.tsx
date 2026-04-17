'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const HeroSphere = dynamic(() => import('./HeroSphere'), { ssr: false });

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
  tagline?: string;
  description: ReactNode;
  highlights: string[];
  darkText?: boolean;
}

const brands: Brand[] = [
  {
    id: 'multiverse',
    name: 'Multiverse Computing',
    logo: '/symbol-multiverse.png',
    color: '#1a1414ff',
    gradient: 'from-[#14171A] via-[#2a0a1a] to-[#7d1a1aff]',
    role: 'Forward Deployed Engineer',
    period: 'Oct 2025 — Present · Madrid',
    type: 'experience',
    tagline: 'Compressing the LLMs that run the world.',
    description: (
      <>
        <p>
          A European deep-tech scaleup focused on <strong className="text-white/85 font-semibold">AI efficiency</strong>. Core engineer on <strong className="text-white/85 font-semibold">CompactifAI</strong>, shrinking frontier LLMs by up to <strong className="text-white/85 font-semibold">80%</strong>.
        </p>
        <p>
          Currently serving as <em className="text-white/80">Forward Deployed Engineer</em> with a <strong className="text-white/85 font-semibold">$100B+</strong> enterprise client. On-site. Product meets customer.
        </p>
      </>
    ),
    highlights: ['CompactifAI', 'LLM Compression', '80% smaller', 'Forward Deployed'],
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
    id: 'zrive',
    name: 'Zrive',
    logo: '/zrive-logo.svg',
    color: '#ffad81ff',
    gradient: 'from-orange-800 via-orange-600 to-orange-950',
    role: 'Applied Data Science Program',
    period: '2025',
    type: 'education',
    description:
      '15-week intensive program with industry mentorship from Meta, Vodafone, and Revolut engineers. Real-world projects with enterprise data.',
    highlights: ['Data Science', 'ML Engineering', 'Industry Mentors', 'Real Projects'],
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
  const fullName = 'Markel Ramiro'.split('');

  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* 3D Sphere */}
      <HeroSphere
        followRange={0.3}
        followSpeed={0.008}
        autoSpinSpeed={0.2}
        lights={[
          { color: '#ffffffff', intensity: 90, position: [-24, -20, -15], distance: 60 },
          { color: '#ffffffff', intensity: 110, position: [23, 14, 15], distance: 60 },
          { color: '#ffffffff', intensity: 60, position: [3, -14, -13], distance: 60 },
          { color: '#1B0066', intensity: 80, position: [-1, 11, 0], distance: 60 },
        ]}
      />

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

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

        {/* Name — single line, Instrument Serif italic */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ fontFamily: 'var(--font-instrument), Georgia, serif' }}
          className="italic text-center select-none whitespace-nowrap text-[clamp(3rem,12vw,7rem)] leading-[0.95] tracking-[-0.01em] font-normal"
        >
          <span className="inline-flex overflow-hidden">
            {fullName.map((letter, i) => (
              <motion.span
                key={`n-${i}`}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-sm sm:text-lg text-white/75 font-light max-w-md text-center leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Making LLMs smaller, faster, and actually useful.
        </motion.p>

        {/* Brand logos — infinite marquee */}
        <motion.div
          className="mt-20 sm:mt-24 w-full max-w-lg md:max-w-2xl lg:max-w-4xl overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          }}
        >
          <div className="flex animate-marquee w-max gap-10 sm:gap-14 md:gap-20 lg:gap-24">
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={96}
                    height={96}
                    className="w-16 sm:w-16 md:w-20 lg:w-24 h-auto opacity-50 hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <span
                    className="text-sm md:text-base font-bold opacity-40"
                    style={{ color: brand.color }}
                  >
                    {brand.logoText}
                  </span>
                )}
              </div>
            ))}
          </div>
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

/* ─── Brand Section ───────────────────────────────────────────── */

function BrandSection({ brand }: { brand: Brand }) {
  return (
    <section
      id={brand.id}
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 md:py-32"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient}`} />

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
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-2xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Type badge */}
        <span className={`inline-block px-3 py-1 text-[10px] tracking-[0.25em] uppercase rounded-full mb-8 ${
          brand.darkText
            ? 'text-gray-500 border border-gray-300'
            : 'text-white/40 border border-white/10'
        }`}>
          {brand.type}
        </span>

        {/* Logo */}
        <div className="flex justify-center mb-6">
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
        </div>

        {/* Headline: tagline replaces the brand name as h2 when present;
            otherwise the brand name itself is the h2 */}
        {brand.tagline ? (
          <>
            <div className={`mb-4 text-[11px] tracking-[0.3em] uppercase font-medium ${
              brand.darkText ? 'text-gray-500' : 'text-white/45'
            }`}>
              {brand.name}
            </div>
            <h2 className={`italic text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.15] md:leading-[1.1] mb-5 md:mb-6 max-w-3xl mx-auto ${
              brand.darkText ? 'text-gray-900' : 'text-white'
            }`}>
              {brand.tagline}
            </h2>
          </>
        ) : (
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 ${
            brand.darkText ? 'text-gray-900' : 'text-white'
          }`}>
            {brand.name}
          </h2>
        )}

        {/* Role & Period — compact single line when a tagline exists, two-line otherwise */}
        {brand.tagline ? (
          <p className={`text-xs sm:text-sm tracking-[0.2em] uppercase mt-2 ${
            brand.darkText ? 'text-gray-500' : 'text-white/40'
          }`}>
            {brand.role} <span className="mx-2 opacity-50">·</span> {brand.period}
          </p>
        ) : (
          <>
            <p className={`text-lg md:text-xl font-medium ${brand.darkText ? 'text-gray-700' : 'text-white/65'}`}>
              {brand.role}
            </p>
            <p className={`text-xs tracking-[0.2em] uppercase mt-1.5 ${brand.darkText ? 'text-gray-500' : 'text-white/30'}`}>
              {brand.period}
            </p>
          </>
        )}

        {/* Description — supports ReactNode for rich, multi-paragraph copy */}
        <div className={`mt-10 space-y-4 text-base md:text-lg leading-[1.75] max-w-xl mx-auto ${
          brand.darkText ? 'text-gray-600' : 'text-white/55'
        }`}>
          {typeof brand.description === 'string' ? (
            <p>{brand.description}</p>
          ) : (
            brand.description
          )}
        </div>

        {/* Highlights */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
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
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Timeline Navigation ─────────────────────────────────────── */

type NavItem = {
  id: string;
  name: string;
  color: string;
  kind: 'meta' | 'brand';
};

const navItems: NavItem[] = [
  { id: 'home', name: 'Home', color: '#ffffff', kind: 'meta' },
  ...brands.map((b): NavItem => ({
    id: b.id,
    name: b.name,
    color: b.color,
    kind: 'brand',
  })),
  { id: 'contact', name: 'Contact', color: '#ffffff', kind: 'meta' },
];

function TimelineNav() {
  const [activeSection, setActiveSection] = useState('home');
  const [visible, setVisible] = useState(false);

  // Track if we're on a light-background section (EHU)
  const onLightBg = activeSection === 'ehu';

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      setVisible(window.scrollY > vh * 0.08);

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.5 && rect.bottom >= vh * 0.5) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Colors adapt to light/dark background
  const inactiveColor = onLightBg ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.16)';
  const lineColor = onLightBg ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)';
  const metaActiveColor = onLightBg ? '#374151' : '#ffffff';

  return (
    <motion.nav
      className="fixed right-5 md:right-7 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        {/* Vertical line — centered on the 12px marker column */}
        <div
          className="absolute left-[5.5px] top-3 bottom-3 w-px transition-colors duration-500"
          style={{ backgroundColor: lineColor }}
        />

        <div className="flex flex-col gap-[18px]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isBrand = item.kind === 'brand';
            const isEhu = item.id === 'ehu';
            const activeColor = isBrand
              ? isEhu ? '#374151' : item.color
              : metaActiveColor;

            return (
              <button
                key={item.id}
                onClick={() =>
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center gap-3 group outline-none"
                aria-label={item.name}
              >
                {/* Marker container — fixed 12px so markers stay centered on line */}
                <div className="w-3 h-3 flex items-center justify-center shrink-0">
                  {isBrand ? (
                    <div
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? 9 : 5,
                        height: isActive ? 9 : 5,
                        backgroundColor: isActive ? activeColor : inactiveColor,
                        boxShadow: isActive
                          ? `0 0 10px ${isEhu ? 'rgba(55,65,81,0.35)' : item.color + '55'}`
                          : 'none',
                      }}
                    />
                  ) : (
                    <div
                      className="transition-all duration-300"
                      style={{
                        width: isActive ? 11 : 8,
                        height: 1.5,
                        backgroundColor: isActive ? activeColor : inactiveColor,
                      }}
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] tracking-[0.18em] uppercase font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? onLightBg
                        ? 'opacity-80 text-gray-700 translate-x-0'
                        : 'opacity-80 text-white/75 translate-x-0'
                      : onLightBg
                        ? 'opacity-0 group-hover:opacity-45 text-gray-500 -translate-x-1 group-hover:translate-x-0'
                        : 'opacity-0 group-hover:opacity-45 text-white/50 -translate-x-1 group-hover:translate-x-0'
                  }`}
                >
                  {item.name}
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
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center relative">
      <HeroSphere
        followRange={0.4}
        followSpeed={0.005}
        autoSpinSpeed={0.9}
        lights={[
          { color: '#FF2D7B', intensity: 100, position: [-24, -20, -15], distance: 60 },
          { color: '#00E5CC', intensity: 110, position: [23, 14, 15], distance: 60 },
          { color: '#A455FF', intensity: 80, position: [3, -14, -13], distance: 60 },
          { color: '#FF5500', intensity: 90, position: [-1, 11, 0], distance: 60 },
        ]}
      />
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

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs tracking-[0.15em] uppercase">
          <a
            href="https://github.com/Riemann-def"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/markel-ramiro-vaquero-92530319b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="/cv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors duration-300"
          >
            Resume
          </a>
          <a
            href="/blog"
            className="text-white/50 hover:text-white transition-colors duration-300"
          >
            Writing
          </a>
        </div>

        <p className="mt-24 text-white/50 text-[10px] tracking-[0.2em] uppercase">
          Bilbao, Spain
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */

export default function ScrollPortfolio() {
  return (
    <main className="bg-[#050505] overflow-x-hidden">
      <HeroSection />
      <TimelineNav />
      {brands.map((brand) => (
        <BrandSection key={brand.id} brand={brand} />
      ))}
      <ContactFooter />
    </main>
  );
}
