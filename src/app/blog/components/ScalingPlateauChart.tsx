'use client';

import { motion } from 'framer-motion';

interface ScalingPlateauChartProps {
  title: string;
  caption: string;
  linearLabel: string;
  logLabel: string;
}

// Catmull-Rom → cubic Bezier path for smooth curve through points
function smoothPath(pts: { cx: number; cy: number }[]): string {
  if (pts.length === 0) return '';
  if (pts.length === 1) return `M ${pts[0].cx} ${pts[0].cy}`;
  let d = `M ${pts[0].cx} ${pts[0].cy}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i < pts.length - 2 ? pts[i + 2] : p2;
    const c1x = p1.cx + (p2.cx - p0.cx) / 6;
    const c1y = p1.cy + (p2.cy - p0.cy) / 6;
    const c2x = p2.cx - (p3.cx - p1.cx) / 6;
    const c2y = p2.cy - (p3.cy - p1.cy) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.cx} ${p2.cy}`;
  }
  return d;
}

export default function ScalingPlateauChart({
  title,
  caption,
  linearLabel,
  logLabel,
}: ScalingPlateauChartProps) {
  // Same five points: compute = 10²², 10²³, 10²⁴, 10²⁵, 10²⁶
  // Loss decreases linearly in log-compute space (idealized scaling law).
  // y_norm: 0 = top of panel (high loss), 1 = bottom (low loss)
  const yNorm = [0.05, 0.27, 0.5, 0.73, 0.95];

  // Linear x: x = compute / max_compute → first four points cluster on the left
  const xLinear = [0.0001, 0.001, 0.01, 0.1, 1.0];
  // Log x: evenly spaced from 0 to 1
  const xLog = [0, 0.25, 0.5, 0.75, 1.0];

  const panel1 = { x: 60, y: 35, w: 220, h: 160 }; // linear
  const panel2 = { x: 360, y: 35, w: 220, h: 160 }; // log

  const toSvg = (
    panel: { x: number; y: number; w: number; h: number },
    xn: number,
    yn: number
  ) => ({ cx: panel.x + xn * panel.w, cy: panel.y + yn * panel.h });

  const linearPts = xLinear.map((x, i) => toSvg(panel1, x, yNorm[i]));
  const logPts = xLog.map((x, i) => toSvg(panel2, x, yNorm[i]));

  const renderPanel = (
    panel: { x: number; y: number; w: number; h: number },
    pts: { cx: number; cy: number }[],
    label: string,
    color: string,
    delay: number,
    panelKey: string
  ) => (
    <g key={panelKey}>
      {/* panel label */}
      <text
        x={panel.x}
        y={panel.y - 12}
        fill="rgba(255,255,255,0.55)"
        fontSize="16"
        style={{ fontFamily: 'var(--font-caveat), cursive' }}
      >
        {label}
      </text>
      {/* Y axis (slight wobble) */}
      <path
        d={`M ${panel.x} ${panel.y - 8} C ${panel.x - 1} ${panel.y + panel.h / 2}, ${panel.x + 1} ${panel.y + panel.h - 20}, ${panel.x} ${panel.y + panel.h + 4}`}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
      {/* X axis (slight wobble) */}
      <path
        d={`M ${panel.x - 4} ${panel.y + panel.h} C ${panel.x + panel.w / 2} ${panel.y + panel.h + 1.5}, ${panel.x + panel.w * 0.8} ${panel.y + panel.h - 1}, ${panel.x + panel.w + 6} ${panel.y + panel.h}`}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Curve */}
      <motion.path
        d={smoothPath(pts)}
        stroke={color}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.8, ease: 'easeInOut', delay }}
      />
      {/* Dots */}
      {pts.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r="5"
          fill="rgba(255,255,255,0.88)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: delay + 0.2 + i * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {/* X axis caption */}
      <text
        x={panel.x + panel.w / 2}
        y={panel.y + panel.h + 24}
        textAnchor="middle"
        fill="rgba(255,255,255,0.4)"
        fontSize="14"
        style={{ fontFamily: 'var(--font-caveat), cursive' }}
      >
        compute →
      </text>
    </g>
  );

  return (
    <figure className="my-12">
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 sm:p-7">
        <p
          className="text-white/60 text-base sm:text-lg mb-3 leading-snug"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          {title}
        </p>

        <svg viewBox="0 0 640 240" className="w-full h-auto" aria-hidden="true">
          {/* shared Y label */}
          <text
            x="32"
            y="58"
            fill="rgba(255,255,255,0.55)"
            fontSize="18"
            style={{ fontFamily: 'var(--font-caveat), cursive' }}
          >
            loss
          </text>
          {renderPanel(panel1, linearPts, linearLabel, 'rgba(255,116,72,0.7)', 0, 'linear')}
          {renderPanel(panel2, logPts, logLabel, 'rgba(10,215,171,0.7)', 0.4, 'log')}
        </svg>

        <p
          className="text-white/45 text-base sm:text-[17px] leading-snug mt-2"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          {caption}
        </p>
      </div>
    </figure>
  );
}
