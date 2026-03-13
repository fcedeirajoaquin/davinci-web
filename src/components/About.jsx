import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from './TextReveal'
import { useContent } from '../context/ContentContext'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { content } = useContent()
  const c = content.about

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const item = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={item} className="text-center mb-20">
            <span className="inline-block text-primary/60 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {c.sectionLabel}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-deep mb-6">
              <TextReveal as="span" className="text-deep">{c.titlePart1}</TextReveal>
              <TextReveal as="span" className="text-primary" delay={0.2}>{c.titlePart2}</TextReveal>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-0.5 bg-accent mx-auto mb-6"
            />
            <p className="text-text/60 text-lg max-w-2xl mx-auto leading-relaxed">
              {c.description}
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div variants={item} className="space-y-6">
              <h3 className="text-3xl font-display text-deep">
                {c.contentTitle}
              </h3>
              <p className="text-text/60 leading-relaxed">
                {c.contentP1}
              </p>
              <p className="text-text/60 leading-relaxed">
                {c.contentP2}
              </p>
            </motion.div>

            <motion.div variants={item} className="relative">
              <div className="rounded-3xl overflow-hidden border border-primary/5 shadow-xl">
                <img
                  src={c.imageUrl}
                  alt={c.imageAlt}
                  className="w-full object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
