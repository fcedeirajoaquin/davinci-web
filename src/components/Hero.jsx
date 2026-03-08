import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FaChevronDown, FaCheckCircle } from 'react-icons/fa'
import { useEffect } from 'react'
import AnimatedCounter from './AnimatedCounter'
import TextReveal from './TextReveal'

const Hero = () => {
  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 50, damping: 30 }
  const x1 = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig)
  const y1 = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), springConfig)
  const x2 = useSpring(useTransform(mouseX, [0, 1], [15, -15]), springConfig)
  const y2 = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig)
  const x3 = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig)
  const y3 = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), springConfig)

  useEffect(() => {
    const handleMouse = (e) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-deep overflow-hidden"
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-deep/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(44,108,203,0.3),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(78,214,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 diagonal-lines" />
      </div>

      {/* Mouse-reactive floating shapes */}
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute top-1/4 right-[15%] w-32 h-32 border border-accent/10 rounded-2xl hidden lg:block"
      />
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute bottom-1/3 right-[8%] w-20 h-20 border border-primary/15 rounded-xl hidden lg:block"
      />
      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute top-[15%] left-[8%] w-3 h-3 bg-accent/30 rounded-full hidden lg:block"
      />
      <motion.div
        style={{ x: x2, y: y1 }}
        className="absolute bottom-[20%] left-[12%] w-16 h-16 border border-mid/10 rounded-lg hidden lg:block"
      />
      <motion.div
        style={{ x: x3, y: y2 }}
        className="absolute top-[60%] right-[25%] w-2 h-2 bg-primary/20 rounded-full hidden lg:block"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="space-y-8 flex flex-col items-center"
          >
            <motion.div variants={item}>
              <span className="inline-block bg-accent/10 text-accent px-5 py-2 rounded-full text-sm font-semibold border border-accent/20 backdrop-blur-sm">
                Creadores de Espacios Unicos
              </span>
            </motion.div>

            <motion.div variants={item}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-normal text-white leading-[1.1]">
                <TextReveal className="text-white" as="span">
                  Aberturas de
                </TextReveal>
                <span className="block mt-2">
                  <TextReveal className="text-accent" as="span" delay={0.3}>
                    Alta Calidad
                  </TextReveal>
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={item}
              className="text-lg text-white/60 leading-relaxed max-w-lg text-center"
            >
              Fabricación e instalación de ventanas, puertas y cerramientos en aluminio.
              Más de 10 años transformando espacios con diseño y excelencia.
            </motion.p>

            <motion.div variants={container} className="space-y-3">
              {[
                'Materiales de primera calidad',
                'Instalación profesional garantizada',
                'Diseños personalizados a medida',
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="flex items-center gap-3 text-white/70"
                >
                  <FaCheckCircle className="text-accent text-lg flex-shrink-0" />
                  <span className="font-medium text-sm">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-accent text-deep px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(78,214,241,0.25)] text-center"
              >
                Solicitar Presupuesto
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-center backdrop-blur-sm"
              >
                Ver Servicios
              </motion.a>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              variants={container}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 w-full"
            >
              {[
                { number: 10, suffix: '+', label: 'Años' },
                { number: 500, suffix: '+', label: 'Proyectos' },
                { number: 100, suffix: '%', label: 'Satisfacción' },
              ].map((stat, i) => (
                <motion.div key={i} variants={item} className="text-center">
                  <div className="text-3xl md:text-4xl font-display text-accent mb-1">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} duration={2000} />
                  </div>
                  <div className="text-xs text-white/40 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a href="#about" className="text-white/30 hover:text-accent transition-colors">
          <FaChevronDown className="text-xl" />
        </a>
      </motion.div>
    </section>
  )
}

export default Hero
