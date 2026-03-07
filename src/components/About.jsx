import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaAward, FaUsers, FaRocket, FaHeart } from 'react-icons/fa'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const features = [
    {
      icon: <FaAward className="text-4xl" />,
      title: 'Calidad Garantizada',
      description: 'Materiales premium y acabados perfectos en cada proyecto',
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: 'Equipo Profesional',
      description: 'Expertos con años de experiencia en el sector',
    },
    {
      icon: <FaRocket className="text-4xl" />,
      title: 'Innovación',
      description: 'Últimas tecnologías y tendencias en diseño',
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: 'Pasión por el Detalle',
      description: 'Cuidamos cada aspecto de tu proyecto',
    },
  ]

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="text-deep">Sobre</span>{' '}
              <span className="text-primary">Nosotros</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-primary mx-auto mb-6"
            />
            <motion.p
              variants={itemVariants}
              className="text-text/70 text-lg max-w-3xl mx-auto"
            >
              Con más de una década de experiencia, nos especializamos en la
              fabricación e instalación de aberturas de alta calidad que
              transforman espacios en Módena.
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-3xl font-bold text-deep">
                Creadores de espacios únicos
              </h3>
              <p className="text-text/70 leading-relaxed">
                En <span className="text-primary font-semibold">Da Vinci</span>,
                entendemos que las aberturas son mucho más que simples elementos
                funcionales. Son parte integral del diseño de tu hogar o
                negocio, aportando luz, seguridad y estilo.
              </p>
              <p className="text-text/70 leading-relaxed">
                Nuestro compromiso es ofrecer soluciones personalizadas que se
                adapten perfectamente a tus necesidades, combinando la mejor
                tecnología con el toque artesanal que nos caracteriza.
              </p>
              <div className="flex gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex-1"
                >
                  <div className="text-2xl font-bold text-primary mb-1">10+</div>
                  <div className="text-sm text-text/60">Años de trayectoria</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex-1"
                >
                  <div className="text-2xl font-bold text-primary mb-1">500+</div>
                  <div className="text-sm text-text/60">Proyectos completados</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Image/Visual Element */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-gold/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/10"
              >
                <div className="aspect-square bg-gradient-to-br from-gold/10 to-transparent rounded-xl flex items-center justify-center">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-48 h-48 border-4 border-primary/30 rounded-full flex items-center justify-center"
                  >
                    <div className="text-6xl font-bold text-primary">DV</div>
                  </motion.div>
                </div>
              </motion.div>
              {/* Floating decoration */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"
              />
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(233, 69, 96, 0.1)',
                }}
                className="bg-white backdrop-blur-sm rounded-xl p-6 border border-primary/10 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-primary mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-xl font-bold text-deep mb-2">
                  {feature.title}
                </h4>
                <p className="text-text/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
