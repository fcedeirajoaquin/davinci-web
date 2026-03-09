import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const ParallaxCTA = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <section ref={ref} className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
      {/* Parallax background image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
      >
        <img
          src="/images/parallax-cta.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-deep/80 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display text-white mb-6"
        >
          Tu proximo proyecto empieza <span className="text-accent">aqui</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-white/60 text-lg mb-8 max-w-xl mx-auto"
        >
          Contanos tu idea y te ayudamos a hacerla realidad con las mejores aberturas del mercado
        </motion.p>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block bg-accent text-deep px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(78,214,241,0.3)]"
        >
          Solicitar Presupuesto Gratis
        </motion.a>
      </div>
    </section>
  )
}

export default ParallaxCTA
