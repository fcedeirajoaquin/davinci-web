import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from './TextReveal'
import { useContent } from '../context/ContentContext'
import {
  FaWindowMaximize,
  FaDoorOpen,
  FaShieldAlt,
  FaPaintRoller,
  FaRegSnowflake,
  FaClock,
  FaPencilRuler,
  FaWrench,
} from 'react-icons/fa'

const SERVICE_ICONS = [
  <FaWindowMaximize className="text-4xl" />,
  <FaPaintRoller className="text-4xl" />,
  <FaRegSnowflake className="text-4xl" />,
  <FaRegSnowflake className="text-4xl" />,
  <FaDoorOpen className="text-4xl" />,
  <FaShieldAlt className="text-4xl" />,
  <FaPencilRuler className="text-4xl" />,
  <FaWrench className="text-4xl" />,
  <FaClock className="text-4xl" />,
]

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { content } = useContent()
  const c = content.services

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const card = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section id="services" className="py-24 bg-deep relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 diagonal-lines" />
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent/60 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            {c.sectionLabel}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
            <TextReveal as="span" className="text-white">{c.titlePart1}</TextReveal>
            <TextReveal as="span" className="text-accent" delay={0.2}>{c.titlePart2}</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-accent mx-auto mb-6"
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {c.items.map((service, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="h-full bg-white/[0.04] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.06] hover:border-accent/20 hover:bg-white/[0.08] transition-all duration-500">
                <div className="text-accent/70 mb-6 group-hover:text-accent transition-colors duration-300">
                  {SERVICE_ICONS[index] || SERVICE_ICONS[0]}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-white/60 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-white/50">
                      <span className="w-1 h-1 bg-accent/50 rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <a
                  href={service.isUrgency ? 'tel:+5491161549740' : '#contact'}
                  className="mt-6 block w-full text-center bg-white/[0.06] hover:bg-accent/20 text-white/70 hover:text-white border border-white/10 hover:border-accent/30 px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-sm"
                >
                  {service.isUrgency ? 'Llamanos: 15-6154-9740' : 'Consultar'}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-6 text-lg">
            {c.bottomText}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-accent text-deep px-8 py-4 rounded-xl font-bold hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(78,214,241,0.2)]"
          >
            {c.bottomCta}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
