'use client';

import { motion } from 'framer-motion';

interface ChinchillaChartProps {
  title: string;
  caption: string;
  yLabel: string;
  sweetSpotLabel: string;
}

export default function ChinchillaChart({
  title,
  caption,
  yLabel,
  sweetSpotLabel,
}: ChinchillaChartProps) {
  const points = [
    { x: 130, y: 130, label: '40B' },
    { x: 250, y: 235, label: '70B' },
    { x: 380, y: 268, label: '224B' },
    { x: 510, y: 200, label: '500B' },
  ];

  const curveD = `
    M ${points[0].x} ${points[0].y}
    C ${points[0].x + 50} ${points[0].y + 110},
      ${points[1].x - 30} ${points[1].y - 5},
      ${points[1].x} ${points[1].y}
    S ${points[2].x - 30} ${points[2].y + 5},
      ${points[2].x} ${points[2].y}
    C ${points[2].x + 60} ${points[2].y - 30},
      ${points[3].x - 40} ${points[3].y + 90},
      ${points[3].x} ${points[3].y}
  `;

  return (
    <figure className="my-12">
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 sm:p-7">
        <p
          className="text-white/60 text-base sm:text-lg mb-2 leading-snug"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          {title}
        </p>

        <svg viewBox="0 0 600 400" className="w-full h-auto" aria-hidden="true">
          {/* Y axis - hand-drawn wobble */}
          <path
            d="M 60 50 C 58 130, 63 220, 60 330"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* X axis */}
          <path
            d="M 60 330 C 200 333, 400 328, 565 332"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Y label */}
          <text
            x="48"
            y="42"
            fill="rgba(255,255,255,0.55)"
            fontSize="20"
            style={{ fontFamily: 'var(--font-caveat), cursive' }}
          >
            {yLabel}
          </text>

          {/* Curve through points */}
          <motion.path
            d={curveD}
            stroke="rgba(10, 215, 171, 0.65)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />

          {/* Dots + x labels */}
          {points.map((p, i) => (
            <g key={p.label}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="7"
                fill="rgba(255,255,255,0.9)"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.4 + i * 0.18, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <text
                x={p.x}
                y={360}
                textAnchor="middle"
                fill="rgba(255,255,255,0.55)"
                fontSize="20"
                style={{ fontFamily: 'var(--font-caveat), cursive' }}
              >
                {p.label}
              </text>
            </g>
          ))}

          {/* Sweet spot arrow + label */}
          <motion.g
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 1.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* squiggly arrow shaft */}
            <path
              d="M 380 205 C 372 225, 388 245, 380 260"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            {/* arrow head */}
            <path
              d="M 373 252 L 380 262 L 387 253"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="380"
              y="195"
              textAnchor="middle"
              fill="rgba(255,255,255,0.78)"
              fontSize="24"
              fontWeight="600"
              style={{ fontFamily: 'var(--font-caveat), cursive' }}
            >
              {sweetSpotLabel}
            </text>
          </motion.g>
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
