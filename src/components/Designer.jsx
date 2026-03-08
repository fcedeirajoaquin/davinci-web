import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import TextReveal from './TextReveal'
import {
  FaWindowMaximize,
  FaDoorOpen,
  FaShieldAlt,
  FaWarehouse,
  FaWhatsapp,
  FaRuler,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaTint,
  FaPalette,
  FaTh,
  FaLayerGroup,
} from 'react-icons/fa'

// ─── Product Configuration Data ──────────────────────────────────────────────

const PRODUCT_TYPES = [
  {
    id: 'ventana',
    name: 'Ventana',
    icon: <FaWindowMaximize />,
    styles: [
      { id: 'corrediza', name: 'Corrediza', panels: [2, 3, 4] },
      { id: 'oscilobatiente', name: 'Oscilobatiente', panels: [1, 2] },
      { id: 'pano-fijo', name: 'Pano Fijo', panels: [1, 2, 3] },
      { id: 'de-abrir', name: 'De Abrir', panels: [1, 2] },
      { id: 'banderola', name: 'Banderola', panels: [1] },
    ],
    defaultWidth: 150,
    defaultHeight: 120,
    maxWidth: 400,
    maxHeight: 300,
  },
  {
    id: 'puerta',
    name: 'Puerta',
    icon: <FaDoorOpen />,
    styles: [
      { id: 'de-abrir', name: 'De Abrir', panels: [1, 2] },
      { id: 'corrediza', name: 'Corrediza', panels: [2, 3] },
      { id: 'vidriada', name: 'Vidriada', panels: [1, 2] },
      { id: 'ciega', name: 'Ciega', panels: [1, 2] },
      { id: 'plegadiza', name: 'Plegadiza', panels: [3, 4, 5] },
    ],
    defaultWidth: 80,
    defaultHeight: 200,
    maxWidth: 300,
    maxHeight: 280,
  },
  {
    id: 'cerramiento',
    name: 'Cerramiento',
    icon: <FaShieldAlt />,
    styles: [
      { id: 'balcon', name: 'Balcon', panels: [3, 4, 5, 6] },
      { id: 'terraza', name: 'Terraza', panels: [4, 5, 6, 8] },
      { id: 'galeria', name: 'Galeria', panels: [3, 4, 5] },
      { id: 'patio', name: 'Patio', panels: [2, 3, 4] },
    ],
    defaultWidth: 300,
    defaultHeight: 200,
    maxWidth: 600,
    maxHeight: 300,
  },
  {
    id: 'porton',
    name: 'Porton',
    icon: <FaWarehouse />,
    styles: [
      { id: 'levadizo', name: 'Levadizo', panels: [1] },
      { id: 'corredizo', name: 'Corredizo', panels: [1, 2] },
      { id: 'batiente', name: 'Batiente', panels: [2] },
      { id: 'plegadizo', name: 'Plegadizo', panels: [3, 4, 5] },
    ],
    defaultWidth: 250,
    defaultHeight: 220,
    maxWidth: 500,
    maxHeight: 350,
  },
]

const GLASS_TYPES = [
  { id: 'dvh', name: 'DVH', description: 'Doble vidriado hermetico' },
  { id: 'simple', name: 'Simple', description: 'Vidrio simple 4mm' },
  { id: 'templado', name: 'Templado', description: 'Vidrio templado de seguridad' },
  { id: 'laminado', name: 'Laminado', description: 'Vidrio laminado 3+3' },
]

const COLORS = [
  { id: 'natural', name: 'Aluminio Natural', hex: '#C0C0C0', frame: '#A8A8A8' },
  { id: 'blanco', name: 'Blanco', hex: '#F5F5F5', frame: '#E0E0E0' },
  { id: 'negro', name: 'Negro', hex: '#2D2D2D', frame: '#1A1A1A' },
  { id: 'simil-madera', name: 'Simil Madera', hex: '#8B6F47', frame: '#6B5335' },
  { id: 'gris-grafito', name: 'Gris Grafito', hex: '#4A4A4A', frame: '#3A3A3A' },
  { id: 'bronce', name: 'Bronce', hex: '#7B6841', frame: '#5E5030' },
]

const STEPS = [
  { id: 0, label: 'Tipo', icon: <FaLayerGroup /> },
  { id: 1, label: 'Estilo', icon: <FaTh /> },
  { id: 2, label: 'Medidas', icon: <FaRuler /> },
  { id: 3, label: 'Vidrio', icon: <FaTint /> },
  { id: 4, label: 'Color', icon: <FaPalette /> },
  { id: 5, label: 'Resumen', icon: <FaCheck /> },
]

// ─── SVG Preview Component ───────────────────────────────────────────────────

const ProductPreview = ({ config }) => {
  const { type, style, width, height, panels, color, glass } = config
  const colorData = COLORS.find(c => c.id === color) || COLORS[0]

  // Scale to fit SVG viewport
  const maxDim = Math.max(width, height)
  const scale = 220 / maxDim
  const w = width * scale
  const h = height * scale
  const x = (300 - w) / 2
  const y = (280 - h) / 2

  const frameThick = 8
  const panelGap = 3
  const panelCount = panels || 2

  // Glass gradient based on type
  const glassOpacity = glass === 'ciega' ? 0 : 0.15
  const glassColor = glass === 'dvh' ? '#87CEEB' : glass === 'templado' ? '#90EE90' : glass === 'laminado' ? '#DDA0DD' : '#ADD8E6'

  const renderPanels = () => {
    const innerX = x + frameThick
    const innerY = y + frameThick
    const innerW = w - frameThick * 2
    const innerH = h - frameThick * 2
    const panelW = (innerW - panelGap * (panelCount - 1)) / panelCount
    const elements = []

    for (let i = 0; i < panelCount; i++) {
      const px = innerX + i * (panelW + panelGap)

      // Panel frame
      elements.push(
        <rect
          key={`panel-${i}`}
          x={px}
          y={innerY}
          width={panelW}
          height={innerH}
          fill="none"
          stroke={colorData.frame}
          strokeWidth={3}
          rx={1}
        />
      )

      // Glass fill
      if (type !== 'porton' || style !== 'levadizo') {
        const isCiega = style === 'ciega'
        elements.push(
          <rect
            key={`glass-${i}`}
            x={px + 3}
            y={innerY + 3}
            width={panelW - 6}
            height={innerH - 6}
            fill={isCiega ? colorData.frame : glassColor}
            opacity={isCiega ? 0.5 : 0.25}
            rx={1}
          />
        )

        // Glass reflection effect
        if (!isCiega) {
          elements.push(
            <line
              key={`reflect-${i}`}
              x1={px + panelW * 0.2}
              y1={innerY + innerH * 0.15}
              x2={px + panelW * 0.35}
              y2={innerY + innerH * 0.85}
              stroke="white"
              strokeWidth={1.5}
              opacity={0.15}
            />
          )
        }
      }

      // Opening indicators
      if (style === 'corrediza' && i < panelCount - 1) {
        // Arrow for sliding
        const arrowY = innerY + innerH / 2
        const arrowX = px + panelW - 5
        elements.push(
          <g key={`arrow-${i}`} opacity={0.4}>
            <line x1={arrowX - 12} y1={arrowY} x2={arrowX + 5} y2={arrowY} stroke={colorData.hex === '#F5F5F5' ? '#333' : '#fff'} strokeWidth={1.5} />
            <polyline points={`${arrowX + 1},${arrowY - 4} ${arrowX + 5},${arrowY} ${arrowX + 1},${arrowY + 4}`} fill="none" stroke={colorData.hex === '#F5F5F5' ? '#333' : '#fff'} strokeWidth={1.5} />
          </g>
        )
      }

      if (style === 'oscilobatiente' || style === 'de-abrir') {
        // Hinge/opening triangle indicator
        const triX = type === 'puerta' ? px + panelW / 2 : px + panelW / 2
        const triY = innerY + innerH
        elements.push(
          <polygon
            key={`tri-${i}`}
            points={`${px + 4},${triY - 2} ${px + panelW - 4},${triY - 2} ${triX},${innerY + innerH * 0.6}`}
            fill="none"
            stroke={colorData.hex === '#F5F5F5' ? '#333' : '#fff'}
            strokeWidth={0.8}
            strokeDasharray="4 3"
            opacity={0.3}
          />
        )
      }

      if (style === 'banderola') {
        const triY2 = innerY
        elements.push(
          <polygon
            key={`tri-b-${i}`}
            points={`${px + 4},${triY2 + 2} ${px + panelW - 4},${triY2 + 2} ${px + panelW / 2},${innerY + innerH * 0.4}`}
            fill="none"
            stroke={colorData.hex === '#F5F5F5' ? '#333' : '#fff'}
            strokeWidth={0.8}
            strokeDasharray="4 3"
            opacity={0.3}
          />
        )
      }

      // Handle/lock for doors
      if (type === 'puerta') {
        const handleX = i === 0 ? px + panelW - 12 : px + 8
        elements.push(
          <rect
            key={`handle-${i}`}
            x={handleX}
            y={innerY + innerH * 0.45}
            width={4}
            height={20}
            fill={colorData.frame}
            rx={2}
            opacity={0.7}
          />
        )
      }

      // Porton horizontal lines for levadizo
      if (type === 'porton' && style === 'levadizo') {
        const sectionCount = 4
        const sectionH = innerH / sectionCount
        for (let s = 1; s < sectionCount; s++) {
          elements.push(
            <line
              key={`section-${i}-${s}`}
              x1={px + 2}
              y1={innerY + s * sectionH}
              x2={px + panelW - 2}
              y2={innerY + s * sectionH}
              stroke={colorData.frame}
              strokeWidth={2}
              opacity={0.5}
            />
          )
        }
      }
    }

    // Crossbar for ventana (horizontal divider in middle)
    if (type === 'ventana' && style !== 'banderola') {
      elements.push(
        <line
          key="crossbar"
          x1={innerX}
          y1={innerY + innerH * 0.5}
          x2={innerX + innerW}
          y2={innerY + innerH * 0.5}
          stroke={colorData.frame}
          strokeWidth={2}
          opacity={0.15}
        />
      )
    }

    return elements
  }

  // Dimension labels
  const renderDimensions = () => (
    <g className="dimension-labels" opacity={0.5}>
      {/* Width dimension */}
      <line x1={x} y1={y + h + 20} x2={x + w} y2={y + h + 20} stroke="#4ED6F1" strokeWidth={1} />
      <line x1={x} y1={y + h + 15} x2={x} y2={y + h + 25} stroke="#4ED6F1" strokeWidth={1} />
      <line x1={x + w} y1={y + h + 15} x2={x + w} y2={y + h + 25} stroke="#4ED6F1" strokeWidth={1} />
      <text x={x + w / 2} y={y + h + 35} textAnchor="middle" fill="#4ED6F1" fontSize="11" fontFamily="Montserrat">
        {width} cm
      </text>

      {/* Height dimension */}
      <line x1={x + w + 20} y1={y} x2={x + w + 20} y2={y + h} stroke="#4ED6F1" strokeWidth={1} />
      <line x1={x + w + 15} y1={y} x2={x + w + 25} y2={y} stroke="#4ED6F1" strokeWidth={1} />
      <line x1={x + w + 15} y1={y + h} x2={x + w + 25} y2={y + h} stroke="#4ED6F1" strokeWidth={1} />
      <text x={x + w + 35} y={y + h / 2 + 4} textAnchor="middle" fill="#4ED6F1" fontSize="11" fontFamily="Montserrat" transform={`rotate(90, ${x + w + 35}, ${y + h / 2})`}>
        {height} cm
      </text>
    </g>
  )

  return (
    <motion.svg
      viewBox="0 0 300 320"
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <defs>
        {/* Blueprint grid pattern */}
        <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
          <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(78,214,241,0.06)" strokeWidth="0.5" />
        </pattern>
        {/* Glass gradient */}
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={glassColor} stopOpacity="0.1" />
          <stop offset="50%" stopColor={glassColor} stopOpacity="0.05" />
          <stop offset="100%" stopColor={glassColor} stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Background grid */}
      <rect width="300" height="320" fill="url(#grid)" />

      {/* Outer frame */}
      <motion.rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={colorData.hex}
        stroke={colorData.frame}
        strokeWidth={frameThick}
        rx={3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Panels */}
      {renderPanels()}

      {/* Dimensions */}
      {renderDimensions()}
    </motion.svg>
  )
}

// ─── Step Components ─────────────────────────────────────────────────────────

const StepType = ({ config, setConfig }) => (
  <div className="grid grid-cols-2 gap-4">
    {PRODUCT_TYPES.map((product) => {
      const isSelected = config.type === product.id
      return (
        <motion.button
          key={product.id}
          onClick={() => {
            const defaultStyle = product.styles[0]
            setConfig({
              ...config,
              type: product.id,
              style: defaultStyle.id,
              width: product.defaultWidth,
              height: product.defaultHeight,
              panels: defaultStyle.panels[0],
            })
          }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300 ${
            isSelected
              ? 'bg-accent/15 border-accent/40 text-white shadow-[0_0_30px_rgba(78,214,241,0.1)]'
              : 'bg-white/[0.04] border-white/[0.08] text-white/50 hover:border-white/20 hover:bg-white/[0.07]'
          }`}
        >
          <span className={`text-3xl transition-colors duration-300 ${isSelected ? 'text-accent' : 'text-white/40'}`}>
            {product.icon}
          </span>
          <span className="font-semibold text-sm">{product.name}</span>
          {isSelected && (
            <motion.div
              layoutId="typeIndicator"
              className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FaCheck className="text-deep text-[8px]" />
            </motion.div>
          )}
        </motion.button>
      )
    })}
  </div>
)

const StepStyle = ({ config, setConfig }) => {
  const product = PRODUCT_TYPES.find(p => p.id === config.type)
  if (!product) return null

  return (
    <div className="space-y-3">
      {product.styles.map((styleOpt) => {
        const isSelected = config.style === styleOpt.id
        return (
          <motion.button
            key={styleOpt.id}
            onClick={() => setConfig({ ...config, style: styleOpt.id, panels: styleOpt.panels[0] })}
            whileHover={{ x: 4 }}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
              isSelected
                ? 'bg-accent/15 border-accent/40 text-white'
                : 'bg-white/[0.04] border-white/[0.08] text-white/50 hover:border-white/20'
            }`}
          >
            <span className="font-medium text-sm">{styleOpt.name}</span>
            <span className={`text-xs px-2 py-1 rounded-lg ${isSelected ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/30'}`}>
              {styleOpt.panels.length === 1 ? `${styleOpt.panels[0]} paño${styleOpt.panels[0] > 1 ? 's' : ''}` : `${styleOpt.panels[0]}-${styleOpt.panels[styleOpt.panels.length - 1]} paños`}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

const StepDimensions = ({ config, setConfig }) => {
  const product = PRODUCT_TYPES.find(p => p.id === config.type)
  const styleOpt = product?.styles.find(s => s.id === config.style)
  if (!product || !styleOpt) return null

  return (
    <div className="space-y-6">
      {/* Width */}
      <div>
        <label className="flex justify-between text-sm mb-3">
          <span className="text-white/50 font-medium">Ancho</span>
          <span className="text-accent font-bold">{config.width} cm</span>
        </label>
        <input
          type="range"
          min={30}
          max={product.maxWidth}
          value={config.width}
          onChange={(e) => setConfig({ ...config, width: Number(e.target.value) })}
          className="w-full accent-[#4ED6F1] h-2 rounded-full appearance-none bg-white/10 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(78,214,241,0.5)]
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-xs text-white/20 mt-1">
          <span>30 cm</span>
          <span>{product.maxWidth} cm</span>
        </div>
      </div>

      {/* Height */}
      <div>
        <label className="flex justify-between text-sm mb-3">
          <span className="text-white/50 font-medium">Alto</span>
          <span className="text-accent font-bold">{config.height} cm</span>
        </label>
        <input
          type="range"
          min={30}
          max={product.maxHeight}
          value={config.height}
          onChange={(e) => setConfig({ ...config, height: Number(e.target.value) })}
          className="w-full accent-[#4ED6F1] h-2 rounded-full appearance-none bg-white/10 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(78,214,241,0.5)]
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-xs text-white/20 mt-1">
          <span>30 cm</span>
          <span>{product.maxHeight} cm</span>
        </div>
      </div>

      {/* Panel count */}
      <div>
        <label className="block text-white/50 text-sm font-medium mb-3">Cantidad de Panos</label>
        <div className="flex gap-3">
          {styleOpt.panels.map((p) => (
            <motion.button
              key={p}
              onClick={() => setConfig({ ...config, panels: p })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all duration-300 ${
                config.panels === p
                  ? 'bg-accent/15 border-accent/40 text-accent'
                  : 'bg-white/[0.04] border-white/[0.08] text-white/40 hover:border-white/20'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

const StepGlass = ({ config, setConfig }) => (
  <div className="space-y-3">
    {GLASS_TYPES.map((glass) => {
      const isSelected = config.glass === glass.id
      return (
        <motion.button
          key={glass.id}
          onClick={() => setConfig({ ...config, glass: glass.id })}
          whileHover={{ x: 4 }}
          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
            isSelected
              ? 'bg-accent/15 border-accent/40'
              : 'bg-white/[0.04] border-white/[0.08] hover:border-white/20'
          }`}
        >
          <div className="font-semibold text-sm text-white">{glass.name}</div>
          <div className={`text-xs mt-1 ${isSelected ? 'text-accent/70' : 'text-white/30'}`}>
            {glass.description}
          </div>
        </motion.button>
      )
    })}
  </div>
)

const StepColor = ({ config, setConfig }) => (
  <div className="grid grid-cols-2 gap-3">
    {COLORS.map((color) => {
      const isSelected = config.color === color.id
      return (
        <motion.button
          key={color.id}
          onClick={() => setConfig({ ...config, color: color.id })}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
            isSelected
              ? 'bg-accent/15 border-accent/40'
              : 'bg-white/[0.04] border-white/[0.08] hover:border-white/20'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg border-2 flex-shrink-0 ${isSelected ? 'border-accent' : 'border-white/20'}`}
            style={{ backgroundColor: color.hex }}
          />
          <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-white/50'}`}>
            {color.name}
          </span>
        </motion.button>
      )
    })}
  </div>
)

const StepSummary = ({ config, onSend }) => {
  const product = PRODUCT_TYPES.find(p => p.id === config.type)
  const styleOpt = product?.styles.find(s => s.id === config.style)
  const glass = GLASS_TYPES.find(g => g.id === config.glass)
  const color = COLORS.find(c => c.id === config.color)

  const summaryItems = [
    { label: 'Producto', value: product?.name },
    { label: 'Estilo', value: styleOpt?.name },
    { label: 'Medidas', value: `${config.width} × ${config.height} cm` },
    { label: 'Panos', value: config.panels },
    { label: 'Vidrio', value: glass?.name },
    { label: 'Color', value: color?.name },
  ]

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        {summaryItems.map((item) => (
          <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/[0.06]">
            <span className="text-white/40 text-sm">{item.label}</span>
            <span className="text-white font-semibold text-sm">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-white/50 text-sm font-medium mb-2">Notas adicionales</label>
        <textarea
          rows={3}
          placeholder="Ej: Necesito que sea color RAL especifico, tiene que incluir mosquitero..."
          className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 text-sm resize-none"
          value={config.notes || ''}
          onChange={(e) => config._setNotes?.(e.target.value)}
        />
      </div>

      <motion.button
        onClick={onSend}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-accent text-deep py-4 rounded-xl font-bold text-base hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(78,214,241,0.2)] flex items-center justify-center gap-3"
      >
        <FaWhatsapp className="text-xl" />
        Enviar Diseno por WhatsApp
      </motion.button>
    </div>
  )
}

// ─── Main Designer Component ─────────────────────────────────────────────────

const Designer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [step, setStep] = useState(0)
  const [config, setConfig] = useState({
    type: 'ventana',
    style: 'corrediza',
    width: 150,
    height: 120,
    panels: 2,
    glass: 'dvh',
    color: 'natural',
    notes: '',
  })

  const setNotes = (notes) => setConfig(prev => ({ ...prev, notes }))

  const canGoNext = useMemo(() => {
    if (step === 0) return !!config.type
    if (step === 1) return !!config.style
    return true
  }, [step, config])

  const handleSend = () => {
    const product = PRODUCT_TYPES.find(p => p.id === config.type)
    const styleOpt = product?.styles.find(s => s.id === config.style)
    const glass = GLASS_TYPES.find(g => g.id === config.glass)
    const color = COLORS.find(c => c.id === config.color)

    const message = [
      `Hola! Quiero consultar por un diseno personalizado:`,
      ``,
      `*Producto:* ${product?.name}`,
      `*Estilo:* ${styleOpt?.name}`,
      `*Medidas:* ${config.width} x ${config.height} cm`,
      `*Cantidad de panos:* ${config.panels}`,
      `*Tipo de vidrio:* ${glass?.name}`,
      `*Color:* ${color?.name}`,
      config.notes ? `\n*Notas:* ${config.notes}` : '',
      ``,
      `Diseñado desde el configurador Da Vinci`,
    ].filter(Boolean).join('\n')

    window.open(`https://wa.me/5491161549740?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleReset = () => {
    setStep(0)
    setConfig({
      type: 'ventana',
      style: 'corrediza',
      width: 150,
      height: 120,
      panels: 2,
      glass: 'dvh',
      color: 'natural',
      notes: '',
    })
  }

  const stepContent = [
    <StepType config={config} setConfig={setConfig} />,
    <StepStyle config={config} setConfig={setConfig} />,
    <StepDimensions config={config} setConfig={setConfig} />,
    <StepGlass config={config} setConfig={setConfig} />,
    <StepColor config={config} setConfig={setConfig} />,
    <StepSummary config={{ ...config, _setNotes: setNotes }} onSend={handleSend} />,
  ]

  return (
    <section id="designer" className="py-24 bg-deep relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 diagonal-lines" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent/60 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Disenador Interactivo
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
            <TextReveal as="span" className="text-white">Diagrama tu </TextReveal>
            <TextReveal as="span" className="text-accent" delay={0.2}>Proyecto</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-accent mx-auto mb-6"
          />
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Configura tu abertura paso a paso y envianos el diseno. Nuestro equipo te contactara con un presupuesto a medida.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Step Indicator - horizontal on desktop, scrollable on mobile */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <motion.button
                    onClick={() => i <= step && setStep(i)}
                    whileHover={i <= step ? { scale: 1.05 } : {}}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                      i === step
                        ? 'bg-accent text-deep shadow-[0_0_20px_rgba(78,214,241,0.3)]'
                        : i < step
                        ? 'bg-accent/15 text-accent cursor-pointer'
                        : 'bg-white/[0.04] text-white/20'
                    }`}
                  >
                    <span className="text-sm">{s.icon}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </motion.button>
                  {i < STEPS.length - 1 && (
                    <div className={`w-4 sm:w-8 h-px mx-1 ${i < step ? 'bg-accent/30' : 'bg-white/[0.06]'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content: Preview + Controls */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Live Preview */}
            <motion.div
              layout
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6 lg:p-8 order-1 lg:order-1"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/40 text-xs font-semibold uppercase tracking-[0.15em]">
                  Vista Previa
                </h3>
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.05 }}
                  className="text-white/20 hover:text-white/50 text-xs transition-colors"
                >
                  Reiniciar
                </motion.button>
              </div>

              <div className="aspect-square max-h-[400px] mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${config.type}-${config.style}-${config.panels}-${config.color}-${config.glass}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <ProductPreview config={config} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Quick spec badge */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {[
                  PRODUCT_TYPES.find(p => p.id === config.type)?.name,
                  PRODUCT_TYPES.find(p => p.id === config.type)?.styles.find(s => s.id === config.style)?.name,
                  `${config.width}×${config.height}`,
                  COLORS.find(c => c.id === config.color)?.name,
                ].map((tag, i) => (
                  <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.06] text-white/30 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Controls */}
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6 lg:p-8 order-2 lg:order-2 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-display text-xl">
                  {STEPS[step].label}
                </h3>
                <span className="text-white/20 text-sm">
                  {step + 1} / {STEPS.length}
                </span>
              </div>

              {/* Step Content */}
              <div className="flex-1 min-h-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {stepContent[step]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-white/[0.06]">
                {step > 0 && (
                  <motion.button
                    onClick={() => setStep(step - 1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 text-sm font-semibold"
                  >
                    <FaArrowLeft className="text-xs" />
                    Atras
                  </motion.button>
                )}
                {step < STEPS.length - 1 && (
                  <motion.button
                    onClick={() => canGoNext && setStep(step + 1)}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                      canGoNext
                        ? 'bg-accent text-deep hover:bg-white shadow-[0_0_20px_rgba(78,214,241,0.2)]'
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    Siguiente
                    <FaArrowRight className="text-xs" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Designer
