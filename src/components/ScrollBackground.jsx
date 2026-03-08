import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

const phases = [
  { label: '01 — Diseno', light: true },
  { label: '02 — Materiales', light: false },
  { label: '03 — Ensamblaje', light: true },
  { label: '04 — Terminada', light: false },
]

const ScrollBackground = () => {
  const { scrollYProgress } = useScroll()
  const [phaseIndex, setPhaseIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v < 0.28) setPhaseIndex(0)
    else if (v < 0.46) setPhaseIndex(1)
    else if (v < 0.78) setPhaseIndex(2)
    else setPhaseIndex(3)
  })
  const sp = (val) => useSpring(val, { stiffness: 80, damping: 22 })

  // Fixed right-side position, gentle float that settles at the end
  const yFloat = sp(useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.72, 1], [0, -12, 8, -8, 0, 0]))
  const scale = sp(useTransform(scrollYProgress, [0.03, 0.4, 0.72], [0.92, 1, 1.04]))
  // Never fades out — stays visible through Contact
  const opacity = useTransform(scrollYProgress, [0.02, 0.06], [0, 1])

  // ============================================================
  // PHASE 1: BLUEPRINT (0.03 → 0.28) — technical drawing
  // Draws in, holds visible, then fades for materials
  // ============================================================
  const bpOpacity = useTransform(scrollYProgress, [0.03, 0.06, 0.26, 0.34], [0, 1, 1, 0])
  const bpGridOp = useTransform(scrollYProgress, [0.03, 0.06, 0.24, 0.30], [0, 0.4, 0.4, 0])
  const bpDraw = sp(useTransform(scrollYProgress, [0.04, 0.14], [0, 1]))
  const bpDimOp = useTransform(scrollYProgress, [0.06, 0.10, 0.24, 0.30], [0, 1, 1, 0])
  const bpAnnotOp = useTransform(scrollYProgress, [0.08, 0.12, 0.24, 0.30], [0, 1, 1, 0])

  // ============================================================
  // PHASE 2: MATERIALS (0.28 → 0.48) — frame materializes
  // Frame appears and holds solid through Services
  // ============================================================
  const frameOp = sp(useTransform(scrollYProgress, [0.28, 0.34], [0, 1]))
  const frameShadowOp = sp(useTransform(scrollYProgress, [0.30, 0.38], [0, 1]))
  const innerOp = sp(useTransform(scrollYProgress, [0.34, 0.42], [0, 1]))

  // ============================================================
  // PHASE 3: ASSEMBLY (0.46 → 0.64) — glass, dividers, hardware
  // Everything done by 0.64, HOLDS solid through Gallery (0.675)
  // ============================================================
  const dividerOp = sp(useTransform(scrollYProgress, [0.46, 0.50], [0, 1]))
  const glassOp = sp(useTransform(scrollYProgress, [0.50, 0.56], [0, 1]))
  const glassScale = sp(useTransform(scrollYProgress, [0.50, 0.56], [0.3, 1]))
  const hwOp = sp(useTransform(scrollYProgress, [0.58, 0.64], [0, 1]))
  const hwScale = sp(useTransform(scrollYProgress, [0.58, 0.64], [0, 1]))

  // ============================================================
  // PHASE 4: FINISHED (0.76 → 0.84) — reflections, glow, polish
  // Done by 0.84, HOLDS permanently through Contact and beyond
  // ============================================================
  const finishOp = sp(useTransform(scrollYProgress, [0.76, 0.84], [0, 1]))

  // Phase label + progress
  const progressPct = useTransform(scrollYProgress, [0.03, 0.84], [0, 100])

  return (
    <motion.div
      style={{ opacity }}
      className="fixed top-0 right-0 bottom-0 w-[340px] pointer-events-none z-30 hidden lg:flex items-center justify-center"
    >
      <motion.div
        style={{ y: yFloat, scale }}
        className="relative"
      >
        {/* Phase indicator */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.03, 0.07], [0, 1]) }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
        >
          <div className="w-32 h-[2px] bg-primary/10 rounded-full mx-auto overflow-hidden mb-3">
            <motion.div
              className="h-full bg-accent rounded-full"
              style={{ width: useTransform(progressPct, (v) => `${v}%`) }}
            />
          </div>
          {/* Phase label — single element, state-driven */}
          <p className={`text-xs uppercase tracking-[0.15em] font-bold transition-colors duration-300 ${
            phaseIndex === 3 ? 'text-accent' : phases[phaseIndex].light ? 'text-deep' : 'text-white'
          }`}>
            {phases[phaseIndex].label}
          </p>
        </motion.div>

        <svg width="260" height="360" viewBox="0 0 260 360" fill="none">
          <defs>
            {/* Blueprint color */}
            <linearGradient id="bp" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2C6CCB" />
              <stop offset="100%" stopColor="#4ED6F1" />
            </linearGradient>
            {/* Aluminum gradients */}
            <linearGradient id="alu" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B8C4D4" />
              <stop offset="30%" stopColor="#8A9BB5" />
              <stop offset="60%" stopColor="#A0B0C8" />
              <stop offset="100%" stopColor="#7A8DA8" />
            </linearGradient>
            <linearGradient id="aluDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6B7D95" />
              <stop offset="100%" stopColor="#556175" />
            </linearGradient>
            {/* Glass */}
            <linearGradient id="glassA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4EAF7" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#B8DBF0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#A0CDE8" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="glassB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C8E4F5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#95C8E8" stopOpacity="0.3" />
            </linearGradient>
            {/* Reflection */}
            <linearGradient id="refl" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="3" dy="5" stdDeviation="8" floodOpacity="0.15" />
            </filter>
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          </defs>

          {/* ============================================ */}
          {/* PHASE 1: BLUEPRINT — technical line drawing  */}
          {/* ============================================ */}
          <motion.g style={{ opacity: bpOpacity }}>
            {/* Grid background */}
            <motion.g style={{ opacity: bpGridOp }}>
              {[0, 40, 80, 120, 160, 200, 240].map((x) => (
                <line key={`gv${x}`} x1={x + 10} y1="0" x2={x + 10} y2="360"
                  stroke="#2C6CCB" strokeWidth="0.3" strokeOpacity="0.2" />
              ))}
              {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((y) => (
                <line key={`gh${y}`} x1="0" y1={y} x2="260" y2={y}
                  stroke="#2C6CCB" strokeWidth="0.3" strokeOpacity="0.2" />
              ))}
            </motion.g>

            {/* Main window outline — draws in */}
            <motion.rect x="10" y="10" width="240" height="340" rx="2"
              stroke="url(#bp)" strokeWidth="1.5" fill="none"
              strokeDasharray="4 3"
              style={{ pathLength: bpDraw }}
            />

            {/* Inner frame outline */}
            <motion.rect x="28" y="28" width="204" height="304" rx="1"
              stroke="#2C6CCB" strokeWidth="0.8" fill="none"
              strokeDasharray="3 2"
              style={{ pathLength: bpDraw, opacity: bpDraw }}
            />

            {/* Center cross (mullion + transom) */}
            <motion.line x1="130" y1="28" x2="130" y2="332"
              stroke="#4ED6F1" strokeWidth="0.6" strokeDasharray="6 4"
              style={{ pathLength: bpDraw }}
            />
            <motion.line x1="28" y1="180" x2="232" y2="180"
              stroke="#4ED6F1" strokeWidth="0.6" strokeDasharray="6 4"
              style={{ pathLength: bpDraw }}
            />

            {/* Dimension lines — horizontal */}
            <motion.g style={{ opacity: bpDimOp }}>
              {/* Top dimension */}
              <line x1="10" y1="-2" x2="250" y2="-2" stroke="#2C6CCB" strokeWidth="0.5" />
              <line x1="10" y1="-6" x2="10" y2="2" stroke="#2C6CCB" strokeWidth="0.5" />
              <line x1="250" y1="-6" x2="250" y2="2" stroke="#2C6CCB" strokeWidth="0.5" />
              <text x="130" y="-6" textAnchor="middle" fill="#2C6CCB" fontSize="7" fontFamily="monospace">2600 mm</text>

              {/* Right dimension */}
              <line x1="262" y1="10" x2="262" y2="350" stroke="#2C6CCB" strokeWidth="0.5" />
              <line x1="258" y1="10" x2="266" y2="10" stroke="#2C6CCB" strokeWidth="0.5" />
              <line x1="258" y1="350" x2="266" y2="350" stroke="#2C6CCB" strokeWidth="0.5" />
              <text x="268" y="184" fill="#2C6CCB" fontSize="7" fontFamily="monospace"
                transform="rotate(90, 268, 184)">1800 mm</text>
            </motion.g>

            {/* Annotations */}
            <motion.g style={{ opacity: bpAnnotOp }}>
              {/* DVH label on glass area */}
              <rect x="55" y="90" width="32" height="14" rx="2" fill="#2C6CCB" fillOpacity="0.15" />
              <text x="71" y="100" textAnchor="middle" fill="#4ED6F1" fontSize="7" fontFamily="monospace">DVH</text>

              {/* Marco label */}
              <line x1="15" y1="60" x2="0" y2="48" stroke="#2C6CCB" strokeWidth="0.4" />
              <text x="-2" y="44" textAnchor="end" fill="#2C6CCB" fontSize="6" fontFamily="monospace">Marco</text>

              {/* Herraje label */}
              <circle cx="130" cy="180" r="3" fill="none" stroke="#4ED6F1" strokeWidth="0.5" />
              <line x1="133" y1="177" x2="155" y2="160" stroke="#4ED6F1" strokeWidth="0.4" />
              <text x="157" y="158" fill="#4ED6F1" fontSize="6" fontFamily="monospace">Herraje</text>

              {/* Title block */}
              <rect x="160" y="320" width="80" height="24" rx="1" fill="none" stroke="#2C6CCB" strokeWidth="0.5" strokeOpacity="0.5" />
              <text x="200" y="332" textAnchor="middle" fill="#2C6CCB" fontSize="6" fontFamily="monospace" opacity="0.7">DA VINCI</text>
              <text x="200" y="340" textAnchor="middle" fill="#4ED6F1" fontSize="5" fontFamily="monospace" opacity="0.5">PLANO TECNICO</text>
            </motion.g>
          </motion.g>

          {/* ============================================ */}
          {/* PHASE 2: MATERIALS — solid aluminum frame    */}
          {/* ============================================ */}
          <motion.g style={{ opacity: frameOp }}>
            <motion.g style={{ opacity: frameShadowOp }} filter="url(#shadow)">
              {/* Outer frame */}
              <rect x="10" y="10" width="240" height="18" rx="2" fill="url(#alu)" />
              <rect x="10" y="332" width="240" height="18" rx="2" fill="url(#alu)" />
              <rect x="5" y="346" width="250" height="8" rx="3" fill="url(#aluDark)" />
              <rect x="10" y="10" width="18" height="340" rx="2" fill="url(#alu)" />
              <rect x="232" y="10" width="18" height="340" rx="2" fill="url(#alu)" />
              {/* Frame edges */}
              <rect x="10" y="10" width="240" height="340" rx="2"
                stroke="#6B7D95" strokeWidth="0.5" fill="none" />
            </motion.g>
          </motion.g>

          {/* Inner frame + seals */}
          <motion.g style={{ opacity: innerOp }}>
            <rect x="28" y="28" width="8" height="304" rx="1" fill="url(#alu)" />
            <rect x="224" y="28" width="8" height="304" rx="1" fill="url(#alu)" />
            <rect x="28" y="28" width="204" height="8" rx="1" fill="url(#alu)" />
            <rect x="28" y="324" width="204" height="8" rx="1" fill="url(#alu)" />
            {/* Rubber seals (blue accent) */}
            <rect x="26" y="36" width="1.5" height="288" rx="1" fill="#2C6CCB" opacity="0.35" />
            <rect x="232.5" y="36" width="1.5" height="288" rx="1" fill="#2C6CCB" opacity="0.35" />
            <rect x="36" y="26" width="188" height="1.5" rx="1" fill="#2C6CCB" opacity="0.35" />
            <rect x="36" y="332.5" width="188" height="1.5" rx="1" fill="#2C6CCB" opacity="0.35" />
          </motion.g>

          {/* ============================================ */}
          {/* PHASE 3: ASSEMBLY — dividers, glass, hardware */}
          {/* ============================================ */}

          {/* Mullion + Transom */}
          <motion.g style={{ opacity: dividerOp }}>
            <rect x="126" y="28" width="8" height="304" rx="1" fill="url(#alu)" />
            <rect x="126" y="28" width="8" height="304" rx="1" stroke="#8A9BB5" strokeWidth="0.3" fill="none" />
            <rect x="28" y="176" width="204" height="8" rx="1" fill="url(#alu)" />
            <rect x="28" y="176" width="204" height="8" rx="1" stroke="#8A9BB5" strokeWidth="0.3" fill="none" />
            {/* Junction */}
            <rect x="124" y="174" width="12" height="12" rx="1" fill="url(#aluDark)" />
          </motion.g>

          {/* Glass panels — scale from center of each pane */}
          <motion.g style={{ opacity: glassOp }}>
            <motion.rect x="36" y="36" width="90" height="140" rx="1" fill="url(#glassA)"
              style={{ scale: glassScale, originX: '81px', originY: '106px' }} />
            <motion.rect x="134" y="36" width="90" height="140" rx="1" fill="url(#glassB)"
              style={{ scale: glassScale, originX: '179px', originY: '106px' }} />
            <motion.rect x="36" y="184" width="90" height="140" rx="1" fill="url(#glassB)"
              style={{ scale: glassScale, originX: '81px', originY: '254px' }} />
            <motion.rect x="134" y="184" width="90" height="140" rx="1" fill="url(#glassA)"
              style={{ scale: glassScale, originX: '179px', originY: '254px' }} />
          </motion.g>

          {/* Hardware */}
          <motion.g style={{ opacity: hwOp, scale: hwScale, originX: '130px', originY: '180px' }}>
            <rect x="112" y="148" width="4" height="36" rx="2" fill="#556175" />
            <rect x="110" y="156" width="8" height="20" rx="3" fill="url(#aluDark)" />
            <rect x="110" y="156" width="8" height="20" rx="3" stroke="#4A5568" strokeWidth="0.5" fill="none" />
            <rect x="144" y="148" width="4" height="36" rx="2" fill="#556175" />
            <rect x="142" y="156" width="8" height="20" rx="3" fill="url(#aluDark)" />
            <rect x="142" y="156" width="8" height="20" rx="3" stroke="#4A5568" strokeWidth="0.5" fill="none" />
            {/* Hinges */}
            <rect x="29" y="60" width="5" height="14" rx="1.5" fill="#6B7D95" />
            <rect x="29" y="120" width="5" height="14" rx="1.5" fill="#6B7D95" />
            <rect x="29" y="220" width="5" height="14" rx="1.5" fill="#6B7D95" />
            <rect x="29" y="290" width="5" height="14" rx="1.5" fill="#6B7D95" />
            {/* Lock indicators */}
            <circle cx="119" cy="166" r="2" fill="#4ED6F1" opacity="0.7" />
            <circle cx="141" cy="166" r="2" fill="#4ED6F1" opacity="0.7" />
          </motion.g>

          {/* ============================================ */}
          {/* PHASE 4: FINISHED — reflections + glow       */}
          {/* ============================================ */}
          <motion.g style={{ opacity: finishOp }}>
            {/* Glass reflections */}
            <line x1="45" y1="42" x2="70" y2="130" stroke="url(#refl)" strokeWidth="2" />
            <line x1="50" y1="42" x2="75" y2="130" stroke="url(#refl)" strokeWidth="1" />
            <line x1="145" y1="42" x2="175" y2="145" stroke="url(#refl)" strokeWidth="1.5" />
            <line x1="50" y1="192" x2="80" y2="300" stroke="url(#refl)" strokeWidth="1.5" />
            <line x1="150" y1="200" x2="185" y2="310" stroke="url(#refl)" strokeWidth="2" />
            {/* Sparkle points */}
            <circle cx="45" cy="44" r="3" fill="white" opacity="0.3" />
            <circle cx="145" cy="44" r="3" fill="white" opacity="0.2" />
            <circle cx="80" cy="300" r="2" fill="white" opacity="0.15" />
            {/* Outer glow */}
            <rect x="8" y="8" width="244" height="346" rx="4"
              stroke="#4ED6F1" strokeWidth="1.5" opacity="0.2" filter="url(#glow)" />
          </motion.g>
        </svg>

        {/* Bottom label */}
        <div className="mt-4 text-center whitespace-nowrap">
          <motion.p
            style={{ opacity: useTransform(scrollYProgress, [0.78, 0.84], [0, 1]) }}
            className="text-xs text-accent font-bold tracking-wide"
          >
            Ventana lista para instalar
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ScrollBackground
