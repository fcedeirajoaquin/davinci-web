import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useMemo, useEffect } from 'react'
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
  FaPlus,
  FaTrash,
  FaTimes,
} from 'react-icons/fa'

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCT_TYPES = [
  {
    id: 'ventana',
    name: 'Ventana',
    icon: <FaWindowMaximize />,
    styles: [
      { id: 'corrediza', name: 'Corrediza', panels: [2, 3, 4], hasDirection: true },
      { id: 'oscilobatiente', name: 'Oscilobatiente', panels: [1, 2], hasDirection: true },
      { id: 'pano-fijo', name: 'Paño Fijo', panels: [1, 2, 3], hasDirection: false },
      { id: 'de-abrir', name: 'De Abrir', panels: [1, 2], hasDirection: true },
      { id: 'banderola', name: 'Banderola', panels: [1], hasDirection: false },
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
      { id: 'de-abrir', name: 'De Abrir', panels: [1, 2], hasDirection: true },
      { id: 'corrediza', name: 'Corrediza', panels: [2, 3], hasDirection: true },
      { id: 'vidriada', name: 'Vidriada', panels: [1, 2], hasDirection: true },
      { id: 'ciega', name: 'Ciega', panels: [1, 2], hasDirection: true },
      { id: 'plegadiza', name: 'Plegadiza', panels: [3, 4, 5], hasDirection: false },
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
      { id: 'balcon', name: 'Balcón', panels: [3, 4, 5, 6], hasDirection: false },
      { id: 'terraza', name: 'Terraza', panels: [4, 5, 6, 8], hasDirection: false },
      { id: 'galeria', name: 'Galería', panels: [3, 4, 5], hasDirection: false },
      { id: 'patio', name: 'Patio', panels: [2, 3, 4], hasDirection: false },
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
      { id: 'levadizo', name: 'Levadizo', panels: [1], hasDirection: false },
      { id: 'corredizo', name: 'Corredizo', panels: [1, 2], hasDirection: true },
      { id: 'batiente', name: 'Batiente', panels: [2], hasDirection: true },
      { id: 'plegadizo', name: 'Plegadizo', panels: [3, 4, 5], hasDirection: false },
    ],
    defaultWidth: 250,
    defaultHeight: 220,
    maxWidth: 500,
    maxHeight: 350,
  },
]

const GLASS_TYPES = [
  { id: 'dvh', name: 'DVH', description: 'Doble vidriado hermético' },
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

const LOCATIONS = [
  'Living', 'Cocina', 'Dormitorio', 'Baño', 'Balcón',
  'Terraza', 'Frente', 'Contrafrente', 'Garage', 'Otro',
]

const STEPS = [
  { id: 0, label: 'Tipo', icon: <FaLayerGroup /> },
  { id: 1, label: 'Estilo', icon: <FaTh /> },
  { id: 2, label: 'Medidas', icon: <FaRuler /> },
  { id: 3, label: 'Vidrio', icon: <FaTint /> },
  { id: 4, label: 'Color', icon: <FaPalette /> },
  { id: 5, label: 'Resumen', icon: <FaCheck /> },
]

const DEFAULT_CONFIG = {
  type: 'ventana',
  style: 'corrediza',
  width: 150,
  height: 120,
  panels: 2,
  glass: 'dvh',
  color: 'natural',
  direction: 'derecha',
  mosquitero: false,
  quantity: 1,
  location: 'Living',
  notes: '',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getStyleData = (config) => {
  const product = PRODUCT_TYPES.find(p => p.id === config.type)
  const style = product?.styles.find(s => s.id === config.style)
  return { product, style }
}

const formatDesign = (config, index) => {
  const { product, style } = getStyleData(config)
  const glass = GLASS_TYPES.find(g => g.id === config.glass)
  const color = COLORS.find(c => c.id === config.color)
  const lines = [
    index !== undefined ? `--- Producto ${index + 1} ---` : '',
    `*Producto:* ${product?.name} ${style?.name}`,
    `*Medidas:* ${config.width} x ${config.height} cm`,
    `*Paños:* ${config.panels} | *Apertura:* ${style?.hasDirection ? config.direction : 'N/A'}`,
    `*Vidrio:* ${glass?.name} | *Mosquitero:* ${config.mosquitero ? 'Si' : 'No'}`,
    `*Color:* ${color?.name}`,
    `*Ubicación:* ${config.location}`,
    `*Cantidad:* ${config.quantity} unidad${config.quantity > 1 ? 'es' : ''}`,
    config.notes ? `*Notas:* ${config.notes}` : '',
  ]
  return lines.filter(Boolean).join('\n')
}

// ─── SVG Preview ─────────────────────────────────────────────────────────────

const ProductPreview = ({ config }) => {
  const { type, style, width, height, panels, color, glass, mosquitero, direction } = config
  const colorData = COLORS.find(c => c.id === color) || COLORS[0]
  const { style: styleData } = getStyleData(config)

  const maxDim = Math.max(width, height)
  const scale = 220 / maxDim
  const w = width * scale
  const h = height * scale
  const x = (300 - w) / 2
  const y = (280 - h) / 2

  const frameThick = 8
  const panelGap = 3
  const panelCount = panels || 2
  const isLeft = direction === 'izquierda'

  const glassColor = glass === 'dvh' ? '#87CEEB' : glass === 'templado' ? '#90EE90' : glass === 'laminado' ? '#DDA0DD' : '#ADD8E6'
  const lineColor = colorData.hex === '#F5F5F5' ? '#333' : '#fff'

  const renderPanels = () => {
    const innerX = x + frameThick
    const innerY = y + frameThick
    const innerW = w - frameThick * 2
    const innerH = h - frameThick * 2
    const panelW = (innerW - panelGap * (panelCount - 1)) / panelCount
    const els = []

    for (let i = 0; i < panelCount; i++) {
      const px = innerX + i * (panelW + panelGap)
      const isCiega = style === 'ciega'

      // Panel frame
      els.push(
        <rect key={`p-${i}`} x={px} y={innerY} width={panelW} height={innerH}
          fill="none" stroke={colorData.frame} strokeWidth={3} rx={1} />
      )

      // Glass fill
      if (type !== 'porton' || style !== 'levadizo') {
        els.push(
          <rect key={`g-${i}`} x={px + 3} y={innerY + 3} width={panelW - 6} height={innerH - 6}
            fill={isCiega ? colorData.frame : glassColor} opacity={isCiega ? 0.5 : 0.25} rx={1} />
        )
        if (!isCiega) {
          els.push(
            <line key={`r-${i}`} x1={px + panelW * 0.2} y1={innerY + innerH * 0.15}
              x2={px + panelW * 0.35} y2={innerY + innerH * 0.85}
              stroke="white" strokeWidth={1.5} opacity={0.15} />
          )
        }
      }

      // Mosquitero grid overlay
      if (mosquitero && !isCiega) {
        const spacing = 6
        for (let mx = px + 6; mx < px + panelW - 6; mx += spacing) {
          els.push(
            <line key={`mh-${i}-${mx}`} x1={mx} y1={innerY + 4} x2={mx} y2={innerY + innerH - 4}
              stroke={lineColor} strokeWidth={0.3} opacity={0.12} />
          )
        }
        for (let my = innerY + 6; my < innerY + innerH - 4; my += spacing) {
          els.push(
            <line key={`mv-${i}-${my}`} x1={px + 4} y1={my} x2={px + panelW - 4} y2={my}
              stroke={lineColor} strokeWidth={0.3} opacity={0.12} />
          )
        }
      }

      // Sliding arrows — direction aware
      if ((style === 'corrediza' || style === 'corredizo') && i < panelCount - 1) {
        const arrowY = innerY + innerH / 2
        if (isLeft) {
          const arrowX = px + 5
          els.push(
            <g key={`arr-${i}`} opacity={0.5}>
              <line x1={arrowX + 12} y1={arrowY} x2={arrowX - 5} y2={arrowY} stroke={lineColor} strokeWidth={1.5} />
              <polyline points={`${arrowX - 1},${arrowY - 4} ${arrowX - 5},${arrowY} ${arrowX - 1},${arrowY + 4}`}
                fill="none" stroke={lineColor} strokeWidth={1.5} />
            </g>
          )
        } else {
          const arrowX = px + panelW - 5
          els.push(
            <g key={`arr-${i}`} opacity={0.5}>
              <line x1={arrowX - 12} y1={arrowY} x2={arrowX + 5} y2={arrowY} stroke={lineColor} strokeWidth={1.5} />
              <polyline points={`${arrowX + 1},${arrowY - 4} ${arrowX + 5},${arrowY} ${arrowX + 1},${arrowY + 4}`}
                fill="none" stroke={lineColor} strokeWidth={1.5} />
            </g>
          )
        }
      }

      // Opening triangle — direction aware
      if (style === 'oscilobatiente' || style === 'de-abrir' || style === 'batiente') {
        const triY = innerY + innerH
        // Hinge side is opposite to opening direction
        const hingeX = isLeft ? px + panelW - 4 : px + 4
        const openX = isLeft ? px + 4 : px + panelW - 4
        const tipY = innerY + innerH * 0.6
        els.push(
          <polygon key={`tri-${i}`}
            points={`${hingeX},${triY - 2} ${openX},${triY - 2} ${isLeft ? px + 8 : px + panelW - 8},${tipY}`}
            fill="none" stroke={lineColor} strokeWidth={0.8}
            strokeDasharray="4 3" opacity={0.35} />
        )
      }

      if (style === 'banderola') {
        els.push(
          <polygon key={`trb-${i}`}
            points={`${px + 4},${innerY + 2} ${px + panelW - 4},${innerY + 2} ${px + panelW / 2},${innerY + innerH * 0.4}`}
            fill="none" stroke={lineColor} strokeWidth={0.8}
            strokeDasharray="4 3" opacity={0.35} />
        )
      }

      // Door handle — direction aware
      if (type === 'puerta') {
        const handleX = isLeft ? px + 8 : px + panelW - 12
        els.push(
          <rect key={`hdl-${i}`} x={handleX} y={innerY + innerH * 0.45}
            width={4} height={20} fill={colorData.frame} rx={2} opacity={0.7} />
        )
      }

      // Porton levadizo sections
      if (type === 'porton' && style === 'levadizo') {
        const secH = innerH / 4
        for (let s = 1; s < 4; s++) {
          els.push(
            <line key={`sec-${i}-${s}`} x1={px + 2} y1={innerY + s * secH}
              x2={px + panelW - 2} y2={innerY + s * secH}
              stroke={colorData.frame} strokeWidth={2} opacity={0.5} />
          )
        }
      }
    }

    // Ventana crossbar
    if (type === 'ventana' && style !== 'banderola') {
      els.push(
        <line key="xbar" x1={innerX} y1={innerY + innerH * 0.5}
          x2={innerX + innerW} y2={innerY + innerH * 0.5}
          stroke={colorData.frame} strokeWidth={2} opacity={0.15} />
      )
    }

    return els
  }

  return (
    <motion.svg viewBox="0 0 300 320" className="w-full h-full"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <defs>
        <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
          <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(78,214,241,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="320" fill="url(#grid)" />
      <motion.rect x={x} y={y} width={w} height={h} fill={colorData.hex}
        stroke={colorData.frame} strokeWidth={frameThick} rx={3} />
      {renderPanels()}
      {/* Dimensions */}
      <g opacity={0.5}>
        <line x1={x} y1={y + h + 20} x2={x + w} y2={y + h + 20} stroke="#4ED6F1" strokeWidth={1} />
        <line x1={x} y1={y + h + 15} x2={x} y2={y + h + 25} stroke="#4ED6F1" strokeWidth={1} />
        <line x1={x + w} y1={y + h + 15} x2={x + w} y2={y + h + 25} stroke="#4ED6F1" strokeWidth={1} />
        <text x={x + w / 2} y={y + h + 35} textAnchor="middle" fill="#4ED6F1" fontSize="11" fontFamily="Montserrat">
          {width} cm
        </text>
        <line x1={x + w + 20} y1={y} x2={x + w + 20} y2={y + h} stroke="#4ED6F1" strokeWidth={1} />
        <line x1={x + w + 15} y1={y} x2={x + w + 25} y2={y} stroke="#4ED6F1" strokeWidth={1} />
        <line x1={x + w + 15} y1={y + h} x2={x + w + 25} y2={y + h} stroke="#4ED6F1" strokeWidth={1} />
        <text x={x + w + 35} y={y + h / 2 + 4} textAnchor="middle" fill="#4ED6F1" fontSize="11"
          fontFamily="Montserrat" transform={`rotate(90, ${x + w + 35}, ${y + h / 2})`}>
          {height} cm
        </text>
      </g>
      {/* Direction label */}
      {styleData?.hasDirection && (
        <text x={150} y={15} textAnchor="middle" fill="#4ED6F1" fontSize="9" fontFamily="Montserrat" opacity={0.5}>
          Apertura: {config.direction}
        </text>
      )}
      {/* Mosquitero badge */}
      {mosquitero && (
        <g>
          <rect x={220} y={4} width={70} height={16} rx={8} fill="rgba(78,214,241,0.15)" />
          <text x={255} y={15} textAnchor="middle" fill="#4ED6F1" fontSize="8" fontFamily="Montserrat">
            Mosquitero
          </text>
        </g>
      )}
      {/* Quantity badge */}
      {config.quantity > 1 && (
        <g>
          <rect x={10} y={4} width={30} height={16} rx={8} fill="rgba(78,214,241,0.15)" />
          <text x={25} y={15} textAnchor="middle" fill="#4ED6F1" fontSize="9" fontFamily="Montserrat" fontWeight="bold">
            x{config.quantity}
          </text>
        </g>
      )}
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
            setConfig(prev => ({
              ...prev,
              type: product.id,
              style: defaultStyle.id,
              width: product.defaultWidth,
              height: product.defaultHeight,
              panels: defaultStyle.panels[0],
              direction: 'derecha',
            }))
          }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={`relative overflow-visible flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300 ${
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
            <motion.div layoutId="typeIndicator"
              className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center"
              initial={{ scale: 0 }} animate={{ scale: 1 }}>
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
  const currentStyle = product.styles.find(s => s.id === config.style)

  return (
    <div className="space-y-5">
      {/* Style options */}
      <div className="space-y-2.5">
        {product.styles.map((styleOpt) => {
          const isSelected = config.style === styleOpt.id
          return (
            <motion.button
              key={styleOpt.id}
              onClick={() => setConfig(prev => ({ ...prev, style: styleOpt.id, panels: styleOpt.panels[0] }))}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                isSelected
                  ? 'bg-accent/15 border-accent/40 text-white'
                  : 'bg-white/[0.04] border-white/[0.08] text-white/50 hover:border-white/20'
              }`}
            >
              <span className="font-medium text-sm">{styleOpt.name}</span>
              <span className={`text-xs px-2 py-1 rounded-lg ${isSelected ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/30'}`}>
                {styleOpt.panels.length === 1 ? `${styleOpt.panels[0]} pano${styleOpt.panels[0] > 1 ? 's' : ''}` : `${styleOpt.panels[0]}-${styleOpt.panels[styleOpt.panels.length - 1]} paños`}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Direction selector — only if style supports it */}
      {currentStyle?.hasDirection && (
        <div>
          <label className="block text-white/50 text-sm font-medium mb-2.5">Direccion de apertura</label>
          <div className="grid grid-cols-2 gap-3">
            {['izquierda', 'derecha'].map((dir) => (
              <motion.button
                key={dir}
                onClick={() => setConfig(prev => ({ ...prev, direction: dir }))}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 ${
                  config.direction === dir
                    ? 'bg-accent/15 border-accent/40 text-accent'
                    : 'bg-white/[0.04] border-white/[0.08] text-white/40 hover:border-white/20'
                }`}
              >
                {dir === 'izquierda' ? <FaArrowLeft className="text-xs" /> : <FaArrowRight className="text-xs" />}
                {dir.charAt(0).toUpperCase() + dir.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const sliderClass = `w-full accent-[#4ED6F1] h-2 rounded-full appearance-none bg-white/10 cursor-pointer
  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(78,214,241,0.5)]
  [&::-webkit-slider-thumb]:cursor-pointer`

const StepDimensions = ({ config, setConfig }) => {
  const product = PRODUCT_TYPES.find(p => p.id === config.type)
  const styleOpt = product?.styles.find(s => s.id === config.style)
  if (!product || !styleOpt) return null

  return (
    <div className="space-y-5">
      {/* Width */}
      <div>
        <label className="flex justify-between text-sm mb-2">
          <span className="text-white/50 font-medium">Ancho</span>
          <span className="text-accent font-bold">{config.width} cm</span>
        </label>
        <input type="range" min={30} max={product.maxWidth} value={config.width}
          onChange={(e) => setConfig(prev => ({ ...prev, width: Number(e.target.value) }))}
          className={sliderClass} />
        <div className="flex justify-between text-xs text-white/20 mt-1">
          <span>30 cm</span><span>{product.maxWidth} cm</span>
        </div>
      </div>

      {/* Height */}
      <div>
        <label className="flex justify-between text-sm mb-2">
          <span className="text-white/50 font-medium">Alto</span>
          <span className="text-accent font-bold">{config.height} cm</span>
        </label>
        <input type="range" min={30} max={product.maxHeight} value={config.height}
          onChange={(e) => setConfig(prev => ({ ...prev, height: Number(e.target.value) }))}
          className={sliderClass} />
        <div className="flex justify-between text-xs text-white/20 mt-1">
          <span>30 cm</span><span>{product.maxHeight} cm</span>
        </div>
      </div>

      {/* Panel count */}
      <div>
        <label className="block text-white/50 text-sm font-medium mb-2">Cantidad de Paños</label>
        <div className="flex gap-3">
          {styleOpt.panels.map((p) => (
            <motion.button key={p}
              onClick={() => setConfig(prev => ({ ...prev, panels: p }))}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all duration-300 ${
                config.panels === p
                  ? 'bg-accent/15 border-accent/40 text-accent'
                  : 'bg-white/[0.04] border-white/[0.08] text-white/40 hover:border-white/20'
              }`}>
              {p}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quantity + Mosquitero row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/50 text-sm font-medium mb-2">Cantidad (unidades)</label>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.9 }}
              onClick={() => setConfig(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
              className="w-10 h-10 rounded-xl border border-white/10 text-white/50 hover:border-white/30 hover:text-white flex items-center justify-center transition-all text-lg font-bold">
              -
            </motion.button>
            <span className="flex-1 text-center text-accent font-bold text-lg">{config.quantity}</span>
            <motion.button whileTap={{ scale: 0.9 }}
              onClick={() => setConfig(prev => ({ ...prev, quantity: Math.min(50, prev.quantity + 1) }))}
              className="w-10 h-10 rounded-xl border border-white/10 text-white/50 hover:border-white/30 hover:text-white flex items-center justify-center transition-all text-lg font-bold">
              +
            </motion.button>
          </div>
        </div>
        <div>
          <label className="block text-white/50 text-sm font-medium mb-2">Mosquitero</label>
          <motion.button
            onClick={() => setConfig(prev => ({ ...prev, mosquitero: !prev.mosquitero }))}
            whileTap={{ scale: 0.95 }}
            className={`w-full h-10 rounded-xl border font-semibold text-sm transition-all duration-300 ${
              config.mosquitero
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'bg-white/[0.04] border-white/[0.08] text-white/40 hover:border-white/20'
            }`}>
            {config.mosquitero ? 'Si' : 'No'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

const StepGlass = ({ config, setConfig }) => (
  <div className="space-y-5">
    {/* Glass options */}
    <div className="space-y-2.5">
      {GLASS_TYPES.map((glass) => {
        const isSelected = config.glass === glass.id
        return (
          <motion.button key={glass.id}
            onClick={() => setConfig(prev => ({ ...prev, glass: glass.id }))}
            whileHover={{ x: 4 }}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
              isSelected
                ? 'bg-accent/15 border-accent/40'
                : 'bg-white/[0.04] border-white/[0.08] hover:border-white/20'
            }`}>
            <div className="font-semibold text-sm text-white">{glass.name}</div>
            <div className={`text-xs mt-1 ${isSelected ? 'text-accent/70' : 'text-white/30'}`}>{glass.description}</div>
          </motion.button>
        )
      })}
    </div>

    {/* Location selector */}
    <div>
      <label className="block text-white/50 text-sm font-medium mb-2.5">Donde va ubicada?</label>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {LOCATIONS.map((loc) => (
          <motion.button key={loc}
            onClick={() => setConfig(prev => ({ ...prev, location: loc }))}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`py-2 px-1 rounded-lg border text-xs font-semibold transition-all duration-300 truncate ${
              config.location === loc
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'bg-white/[0.04] border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white/50'
            }`}>
            {loc}
          </motion.button>
        ))}
      </div>
    </div>
  </div>
)

const MiniColorPreview = ({ color, isSelected }) => (
  <svg viewBox="0 0 36 32" className="w-9 h-8 flex-shrink-0">
    <defs>
      <linearGradient id={`cp-${color.id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity={0.15} />
        <stop offset="100%" stopColor="black" stopOpacity={0.1} />
      </linearGradient>
    </defs>
    <rect x={2} y={2} width={32} height={28} rx={2}
      fill={color.hex} stroke={color.frame} strokeWidth={3} />
    <rect x={2} y={2} width={32} height={28} rx={2}
      fill={`url(#cp-${color.id})`} />
    <rect x={5} y={5} width={12.5} height={22} rx={1}
      fill="rgba(135,206,235,0.2)" stroke={color.frame} strokeWidth={0.6} />
    <rect x={18.5} y={5} width={12.5} height={22} rx={1}
      fill="rgba(135,206,235,0.2)" stroke={color.frame} strokeWidth={0.6} />
    {isSelected && <>
      <line x1={7} y1={7} x2={8} y2={24} stroke="white" strokeWidth={0.5} opacity={0.25} />
      <line x1={20.5} y1={7} x2={21.5} y2={24} stroke="white" strokeWidth={0.5} opacity={0.25} />
    </>}
  </svg>
)

const StepColor = ({ config, setConfig }) => (
  <div className="grid grid-cols-2 gap-3">
    {COLORS.map((color) => {
      const isSelected = config.color === color.id
      return (
        <motion.button key={color.id}
          onClick={() => setConfig(prev => ({ ...prev, color: color.id }))}
          whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
            isSelected
              ? 'bg-accent/15 border-accent/40'
              : 'bg-white/[0.04] border-white/[0.08] hover:border-white/20'
          }`}>
          <MiniColorPreview color={color} isSelected={isSelected} />
          <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-white/50'}`}>{color.name}</span>
        </motion.button>
      )
    })}
  </div>
)

// ─── Summary with Cart ───────────────────────────────────────────────────────

const DesignCard = ({ design, index, onRemove }) => {
  const { product, style } = getStyleData(design)
  const color = COLORS.find(c => c.id === design.color)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-3 p-3 bg-white/[0.04] rounded-xl border border-white/[0.06]"
    >
      <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm font-semibold truncate">
          {design.quantity > 1 ? `${design.quantity}x ` : ''}{product?.name} {style?.name}
        </div>
        <div className="text-white/30 text-xs truncate">
          {design.width}x{design.height}cm · {color?.name} · {design.location}
          {design.mosquitero ? ' · Mosquitero' : ''}
        </div>
      </div>
      <motion.button onClick={() => onRemove(index)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        className="text-white/20 hover:text-red-400 transition-colors p-1 flex-shrink-0">
        <FaTimes className="text-xs" />
      </motion.button>
    </motion.div>
  )
}

const StepSummary = ({ config, setConfig, cart, onAddToCart, onRemoveFromCart, onSend }) => {
  const { product, style } = getStyleData(config)
  const glass = GLASS_TYPES.find(g => g.id === config.glass)
  const color = COLORS.find(c => c.id === config.color)

  const summaryItems = [
    { label: 'Producto', value: product?.name },
    { label: 'Estilo', value: style?.name },
    { label: 'Medidas', value: `${config.width} x ${config.height} cm` },
    { label: 'Paños', value: config.panels },
    ...(style?.hasDirection ? [{ label: 'Apertura', value: config.direction === 'izquierda' ? 'Izquierda' : 'Derecha' }] : []),
    { label: 'Vidrio', value: glass?.name },
    { label: 'Mosquitero', value: config.mosquitero ? 'Si' : 'No' },
    { label: 'Color', value: color?.name },
    { label: 'Ubicación', value: config.location },
    { label: 'Cantidad', value: `${config.quantity} unidad${config.quantity > 1 ? 'es' : ''}` },
  ]

  const totalItems = cart.length + 1

  return (
    <div className="space-y-4">
      {/* Current design summary */}
      <div className="space-y-1.5">
        {summaryItems.map((item) => (
          <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-white/[0.05]">
            <span className="text-white/40 text-xs">{item.label}</span>
            <span className="text-white font-semibold text-xs">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Notes */}
      <textarea rows={2}
        placeholder="Notas: color RAL específico, vidrio esmerilado, etc."
        className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 text-xs resize-none"
        value={config.notes}
        onChange={(e) => setConfig(prev => ({ ...prev, notes: e.target.value }))} />

      {/* Add another button */}
      <motion.button onClick={onAddToCart} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-accent/30 text-accent/70 hover:border-accent/60 hover:text-accent hover:bg-accent/5 transition-all duration-300 text-sm font-semibold">
        <FaPlus className="text-xs" />
        Agregar otro producto
      </motion.button>

      {/* Cart list */}
      {cart.length > 0 && (
        <div className="space-y-2">
          <div className="text-white/30 text-xs font-semibold uppercase tracking-wider">
            Otros productos ({cart.length})
          </div>
          <AnimatePresence>
            {cart.map((design, i) => (
              <DesignCard key={i} design={design} index={i} onRemove={onRemoveFromCart} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Send button */}
      <motion.button onClick={onSend} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="w-full bg-accent text-deep py-4 rounded-xl font-bold text-base hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(78,214,241,0.2)] flex items-center justify-center gap-3">
        <FaWhatsapp className="text-xl" />
        Enviar {totalItems > 1 ? `${totalItems} productos` : 'diseño'} por WhatsApp
      </motion.button>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

const Designer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [step, setStep] = useState(0)
  const [config, setConfig] = useState({ ...DEFAULT_CONFIG })
  const [cart, setCart] = useState([])
  const previewKey = `${config.type}-${config.style}-${config.panels}-${config.color}-${config.glass}-${config.direction}-${config.mosquitero}-${config.quantity}`
  const stepRefs = useRef([])

  const canGoNext = useMemo(() => {
    if (step === 0) return !!config.type
    if (step === 1) return !!config.style
    return true
  }, [step, config])

  // Auto-scroll step indicator to active step (only the steps container)
  const stepsContainerRef = useRef(null)
  useEffect(() => {
    const el = stepRefs.current[step]
    const container = stepsContainerRef.current
    if (!el || !container) return
    const timer = setTimeout(() => {
      const elLeft = el.offsetLeft
      const elWidth = el.offsetWidth
      const containerWidth = container.offsetWidth
      container.scrollTo({
        left: elLeft - containerWidth / 2 + elWidth / 2,
        behavior: 'smooth',
      })
    }, 100)
    return () => clearTimeout(timer)
  }, [step])

  const handleAddToCart = () => {
    setCart(prev => [...prev, { ...config }])
    setConfig({ ...DEFAULT_CONFIG })
    setStep(0)
  }

  const handleRemoveFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const handleSend = () => {
    const allDesigns = [...cart, config]
    const isSingle = allDesigns.length === 1

    const lines = [
      `Hola! Quiero consultar por ${isSingle ? 'un diseño' : allDesigns.length + ' productos'}:`,
      '',
      ...allDesigns.map((d, i) => formatDesign(d, isSingle ? undefined : i)),
      '',
      'Diseñado desde el configurador Da Vinci',
    ]

    window.open(`https://wa.me/5491161549740?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
  }

  const handleReset = () => {
    setStep(0)
    setConfig({ ...DEFAULT_CONFIG })
    setCart([])
  }

  const stepContent = [
    <StepType config={config} setConfig={setConfig} />,
    <StepStyle config={config} setConfig={setConfig} />,
    <StepDimensions config={config} setConfig={setConfig} />,
    <StepGlass config={config} setConfig={setConfig} />,
    <StepColor config={config} setConfig={setConfig} />,
    <StepSummary config={config} setConfig={setConfig}
      cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} onSend={handleSend} />,
  ]

  return (
    <section id="designer" className="py-24 bg-deep relative overflow-hidden">
      <div className="absolute inset-0 diagonal-lines" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="inline-block text-accent/60 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Diseñador Interactivo
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
            <TextReveal as="span" className="text-white">Diagrama tu </TextReveal>
            <TextReveal as="span" className="text-accent" delay={0.2}>Proyecto</TextReveal>
          </h2>
          <motion.div initial={{ width: 0 }} animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }} className="h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Configura tu abertura paso a paso y envianos el diseño. Nuestro equipo te contactara con un presupuesto a medida.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>

          {/* Step Indicator */}
          <div className="flex justify-center mb-10">
            <div ref={stepsContainerRef} className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-5 -my-5 px-2
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <motion.button
                    ref={el => stepRefs.current[i] = el}
                    onClick={() => i <= step && setStep(i)}
                    whileHover={i <= step ? { scale: 1.05 } : {}}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                      i === step
                        ? 'bg-accent text-deep shadow-[0_0_20px_rgba(78,214,241,0.3)]'
                        : i < step
                        ? 'bg-accent/15 text-accent cursor-pointer'
                        : 'bg-white/[0.04] text-white/20'
                    }`}>
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

          {/* Cart indicator */}
          {cart.length > 0 && step < 5 && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-6">
              <div className="bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 text-xs text-accent font-medium">
                {cart.length} producto{cart.length > 1 ? 's' : ''} agregado{cart.length > 1 ? 's' : ''} al pedido
              </div>
            </motion.div>
          )}

          {/* Mobile Compact Preview — always visible, small */}
          <div className="lg:hidden mb-5">
            <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-3">
              <div className="flex items-center gap-4">
                {/* Mini SVG */}
                <div className="w-28 h-28 flex-shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.div key={`m-${previewKey}`}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                      className="w-full h-full">
                      <ProductPreview config={config} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Specs al lado */}
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm mb-1.5 truncate">
                    {PRODUCT_TYPES.find(p => p.id === config.type)?.name}{' '}
                    {PRODUCT_TYPES.find(p => p.id === config.type)?.styles.find(s => s.id === config.style)?.name}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      `${config.width}x${config.height} cm`,
                      COLORS.find(c => c.id === config.color)?.name,
                      config.mosquitero && 'Mosquitero',
                      config.quantity > 1 && `x${config.quantity}`,
                    ].filter(Boolean).map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/30 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button onClick={handleReset}
                    className="text-white/20 hover:text-white/40 text-[10px] mt-2 transition-colors">
                    Reiniciar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Desktop Preview — only on lg+ */}
            <motion.div layout
              className="hidden lg:block bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-8 order-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/40 text-xs font-semibold uppercase tracking-[0.15em]">Vista Previa</h3>
                <motion.button onClick={handleReset} whileHover={{ scale: 1.05 }}
                  className="text-white/20 hover:text-white/50 text-xs transition-colors">
                  Reiniciar
                </motion.button>
              </div>

              <div className="aspect-square max-h-[400px] mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div key={`d-${previewKey}`}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
                    className="w-full h-full">
                    <ProductPreview config={config} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {[
                  PRODUCT_TYPES.find(p => p.id === config.type)?.name,
                  PRODUCT_TYPES.find(p => p.id === config.type)?.styles.find(s => s.id === config.style)?.name,
                  `${config.width}x${config.height}`,
                  COLORS.find(c => c.id === config.color)?.name,
                  config.mosquitero && 'Mosquitero',
                  config.quantity > 1 && `x${config.quantity}`,
                ].filter(Boolean).map((tag, i) => (
                  <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.06] text-white/30 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Controls */}
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6 lg:p-8 order-2 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-display text-xl">{STEPS[step].label}</h3>
                <span className="text-white/20 text-sm">{step + 1} / {STEPS.length}</span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto pr-1
                [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                <AnimatePresence mode="wait">
                  <motion.div key={step}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                    {stepContent[step]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex gap-3 mt-6 pt-5 border-t border-white/[0.06]">
                {step > 0 && (
                  <motion.button onClick={() => setStep(step - 1)}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 text-sm font-semibold">
                    <FaArrowLeft className="text-xs" /> Atrás
                  </motion.button>
                )}
                {step < STEPS.length - 1 && (
                  <motion.button onClick={() => canGoNext && setStep(step + 1)}
                    whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                      canGoNext
                        ? 'bg-accent text-deep hover:bg-white shadow-[0_0_20px_rgba(78,214,241,0.2)]'
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}>
                    Siguiente <FaArrowRight className="text-xs" />
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
