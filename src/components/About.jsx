import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaAward, FaUsers, FaRocket, FaHeart } from 'react-icons/fa'
import AnimatedCounter from './AnimatedCounter'
import TextReveal from './TextReveal'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const item = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const features = [
    { icon: <FaAward className="text-3xl" />, title: 'Calidad Garantizada', description: 'Materiales premium y acabados perfectos en cada proyecto' },
    { icon: <FaUsers className="text-3xl" />, title: 'Equipo Profesional', description: 'Expertos con años de experiencia en el sector' },
    { icon: <FaRocket className="text-3xl" />, title: 'Innovación', description: 'Últimas tecnologías y tendencias en diseño' },
    { icon: <FaHeart className="text-3xl" />, title: 'Pasion por el Detalle', description: 'Cuidamos cada aspecto de tu proyecto' },
  ]

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
              Quienes Somos
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-deep mb-6">
              <TextReveal as="span" className="text-deep">Sobre </TextReveal>
              <TextReveal as="span" className="text-primary" delay={0.2}>Nosotros</TextReveal>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-0.5 bg-accent mx-auto mb-6"
            />
            <p className="text-text/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Con mas de una decada de experiencia, nos especializamos en la
              fabricación e instalación de aberturas de alta calidad que
              transforman espacios.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div variants={item} className="space-y-6">
              <h3 className="text-3xl font-display text-deep">
                Creadores de espacios únicos
              </h3>
              <p className="text-text/60 leading-relaxed">
                En <span className="text-primary font-semibold">Da Vinci</span>,
                entendemos que las aberturas son mucho mas que simples elementos
                funcionales. Son parte integral del diseño de tu hogar o
                negocio, aportando luz, seguridad y estilo.
              </p>
              <p className="text-text/60 leading-relaxed">
                Nuestro compromiso es ofrecer soluciones personalizadas que se
                adapten perfectamente a tus necesidades, combinando la mejor
                tecnologia con el toque artesanal que nos caracteriza.
              </p>
              <div className="flex gap-4 pt-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-5 flex-1 shadow-sm border border-primary/5"
                >
                  <div className="text-3xl font-display text-primary mb-1">
                    <AnimatedCounter target={10} suffix="+" duration={1500} />
                  </div>
                  <div className="text-sm text-text/50">Anos de trayectoria</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-5 flex-1 shadow-sm border border-primary/5"
                >
                  <div className="text-3xl font-display text-primary mb-1">
                    <AnimatedCounter target={500} suffix="+" duration={2000} />
                  </div>
                  <div className="text-sm text-text/50">Proyectos completados</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={item} className="relative">
              <div className="rounded-3xl overflow-hidden border border-primary/5 shadow-xl">
                <img
                  src="/images/about.jpg"
                  alt="Casa moderna con ventanales de aluminio"
                  className="w-full object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            variants={container}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-7 border border-primary/5 shadow-sm hover:shadow-md hover:border-primary/15 transition-all duration-300 group"
              >
                <div className="text-primary/70 mb-5 group-hover:text-primary transition-colors duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-deep mb-2">
                  {feature.title}
                </h4>
                <p className="text-text/50 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
