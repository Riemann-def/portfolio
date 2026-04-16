"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Horizontal scroll — 5 panels narrating the career arc.
 * Desktop widths: 100 + 75 + 100 + 100 + 100 = 475vw.  Travel: 375vw.
 * Mobile: the .dark panel expands to 100vw via CSS → 500vw total, 400vw travel.
 *
 * Scroll dwell: the track holds at x=0 for the first slice of scroll so the
 * user has time to read the intro panel before horizontal motion begins.
 */

const ITEMS_VW = [100, 75, 100, 100, 100];
const TOTAL_VW = ITEMS_VW.reduce((a, b) => a + b, 0);
const TRAVEL_VW = TOTAL_VW - 100;
const MOBILE_TRAVEL_VW = 400;
const MOBILE_BREAKPOINT = 860;
const DWELL_VH = 20;
const WRAP_VH = TRAVEL_VW + 100 + DWELL_VH;
const DWELL_END = DWELL_VH / WRAP_VH;

const sideProjects = [
  {
    name: "beLASAI",
    logo: "/logo-belasai.png",
    period: "Nov 2024 — May 2025",
    role: "Freelance Developer",
    summary:
      "MVP for a grant-winning worker-wellness portal. Shipped and maintained production with monitoring and auto-scaling. Currently at Lanzadera’s acceleration program.",
  },
  {
    name: "Wippass",
    logo: "/wippass-logo.png",
    period: "Mar 2023 — Jul 2024",
    role: "Founder & Developer",
    summary:
      "Digital ticketing platform. €25k+ in transactions, sold-out 900+ attendee events. Featured in El Referente for entrepreneurial innovation.",
  },
];

const education = [
  {
    name: "Zrive",
    logo: "/zrive-logo.svg",
    period: "Apr 2025 — Jul 2025",
    detail: "Applied Data Science Program · 13-week intensive.",
    extra:
      "6-week churn prediction project with Komorebi AI using time-series modeling and LSTM networks.",
  },
    {
    name: "UPV/EHU",
    logo: "/ehu-logo-dark.svg",
    period: "Sep 2020 — Jul 2024",
    detail: "B.Sc. in Artificial Intelligence · 1st graduating class.",
    extra:
      "Final project: Anomaly detection and deployment in Kubernetes (9/10). Courses: ML & Neural Networks, Massive Data Processing, Temporal Data Analysis.",
  }
];

export default function EnzoHorizontalScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [travelVw, setTravelVw] = useState(TRAVEL_VW);

  useEffect(() => {
    const update = () => {
      setTravelVw(window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_TRAVEL_VW : TRAVEL_VW);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { damping: 25, stiffness: 120, mass: 0.3 });
  const x = useTransform(smooth, [0, DWELL_END, 1], ["0vw", "0vw", `-${travelVw}vw`]);

  return (
    <section id="work" className="enzo-horizontal-wrap" ref={ref} style={{ height: `${WRAP_VH}vh` }}>
      <div className="enzo-horizontal-sticky">
        <motion.div className="enzo-horizontal-track" style={{ x, width: `${TOTAL_VW}vw` }}>
          {/* 01 — Intro */}
          <div className="enzo-scroll-item intro" style={{ width: `${ITEMS_VW[0]}vw` }}>
            <span className="enzo-item-label">01 / Who</span>
            <div className="enzo-arrow">→</div>
            <h2 className="serif" style={{ maxWidth: "22ch", marginBottom: "1.25rem" }}>
              I build software for the <span className="italic">LLM era</span>.
            </h2>
            <p className="text-md" style={{ maxWidth: "54ch", opacity: 0.75 }}>
              Half engineer, half LLM obsessive. Five years writing code across
              deep tech, enterprise automation, and my own side companies.
              Mostly trying to make AI systems that are small, fast, and honest
              about what they do.
            </p>
          </div>

          {/* 02 — Multiverse (cream contrast) */}
          <div className="enzo-scroll-item dark" style={{ width: `${ITEMS_VW[1]}vw` }}>
            <span className="enzo-item-label" style={{ color: "var(--enzo-ink)", opacity: 0.6 }}>02 / Now</span>
            <div style={{ width: "min(220px, 32vw)", marginBottom: "2rem", display: "grid", placeItems: "center" }}>
              <Image
                src="/symbol-multiverse.png"
                alt="Multiverse Computing"
                width={220}
                height={80}
                style={{ objectFit: "contain", width: "100%", height: "auto" }}
              />
            </div>
            <h2 style={{ maxWidth: "18ch" }}>
              <span className="italic">Compressing</span> the language models that run the world.
            </h2>
            <p className="text-md" style={{ maxWidth: "46ch", marginTop: "1.5rem" }}>
              Software Engineer at <b>Multiverse Computing</b>, a European
              deep-tech scaleup specializing in AI efficiency. Core engineer on{" "}
              <b>CompactifAI</b> &mdash; our flagship LLM compression product,
              capable of shrinking model size by up to <b>80%</b>.
            </p>
            <p className="text-md" style={{ maxWidth: "46ch", marginTop: "0.75rem" }}>
              Currently serving as <b>Forward Deployed Engineer</b> for a{" "}
              <b>$100B+ market-cap</b> enterprise client, bridging product and
              customer on-site.
            </p>
            <p className="text-sm" style={{ opacity: 0.55, marginTop: "1.5rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Oct 2025 — Present · Madrid
            </p>
          </div>

          {/* 03 — Devol RPA */}
          <div className="enzo-scroll-item" style={{ width: `${ITEMS_VW[2]}vw`, justifyContent: "flex-end" }}>
            <span className="enzo-item-label">03 / Before Multiverse</span>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: 52, height: 52, borderRadius: 999, background: "var(--enzo-cream)", display: "grid", placeItems: "center", padding: 8 }}>
                <Image src="/devol-logo.png" alt="Devol" width={40} height={40} style={{ objectFit: "contain" }} />
              </div>
              <p className="text-sm" style={{ opacity: 0.65, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Devol · Data &amp; AI Engineer
              </p>
            </div>
            <h2 className="serif" style={{ maxWidth: "22ch", marginBottom: "1.5rem" }}>
              I ran the <span className="italic">AI department</span> at an automation firm.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", maxWidth: "1100px" }}>
              <div>
                <p className="text-sm" style={{ opacity: 0.55, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>DocMind</p>
                <p className="text-md" style={{ opacity: 0.85 }}>
                  LLM-based document extraction. Cut manual processing time by <b>85%</b> for enterprise clients.
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ opacity: 0.55, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>NL → SQL</p>
                <p className="text-md" style={{ opacity: 0.85 }}>
                  RAG-based natural-language-to-SQL system using DDL documents as context.
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ opacity: 0.55, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>MLOps</p>
                <p className="text-md" style={{ opacity: 0.85 }}>
                  Docker + CI/CD for a brand-new AI team. <b>70%</b> faster deploys. Mentored juniors.
                </p>
              </div>
            </div>
            <p className="text-sm" style={{ opacity: 0.45, marginTop: "2rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Jul 2024 — Oct 2025 · Bilbao
            </p>
          </div>

          {/* 04 — Side projects: Wippass + beLASAI */}
          <div className="enzo-scroll-item" style={{ width: `${ITEMS_VW[3]}vw`, justifyContent: "center" }}>
            <span className="enzo-item-label">04 / What I built on my own</span>
            <h2 className="serif" style={{ maxWidth: "20ch", marginBottom: "3rem" }}>
              Two things I shipped <span className="italic">by myself</span>.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", maxWidth: "1100px" }}>
              {sideProjects.map((p) => (
                <div key={p.name} style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,253,243,0.25)" }}>
                  <div style={{ width: 54, height: 54, borderRadius: 999, background: "var(--enzo-cream)", display: "grid", placeItems: "center", padding: 10 }}>
                    <Image src={p.logo} alt={p.name} width={36} height={36} style={{ objectFit: "contain" }} />
                  </div>
                  <h3 className="serif" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>{p.name}</h3>
                  <p className="text-sm" style={{ opacity: 0.55, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {p.role} &middot; {p.period}
                  </p>
                  <p className="text-md" style={{ opacity: 0.8 }}>{p.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 05 — Education (clean, full-width, no split/buttons) */}
          <div className="enzo-scroll-item" style={{ width: `${ITEMS_VW[4]}vw`, justifyContent: "center" }}>
            <span className="enzo-item-label">05 / Foundations</span>
            <h2 className="serif" style={{ maxWidth: "22ch", marginBottom: "3rem" }}>
              Where I <span className="italic">learned</span> this stuff.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", maxWidth: "1100px" }}>
              {education.map((e) => (
                <div key={e.name} style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,253,243,0.25)" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 999, background: "var(--enzo-cream)", display: "grid", placeItems: "center", padding: 10 }}>
                    <Image src={e.logo} alt={e.name} width={44} height={44} style={{ objectFit: "contain" }} />
                  </div>
                  <h3 className="serif" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>{e.name}</h3>
                  <p className="text-sm" style={{ opacity: 0.55, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {e.period}
                  </p>
                  <p className="text-md" style={{ opacity: 0.9 }}>{e.detail}</p>
                  <p className="text-md" style={{ opacity: 0.6 }}>{e.extra}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
