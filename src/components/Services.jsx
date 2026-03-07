import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FaWindowMaximize,
  FaDoorOpen,
  FaShieldAlt,
  FaTools,
  FaPaintRoller,
  FaRegSnowflake,
} from 'react-icons/fa'

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    {
      icon: <FaWindowMaximize className="text-5xl" />,
      title: 'Ventanas de Aluminio',
      description:
        'Ventanas modernas con aislación térmica y acústica. Diferentes estilos y acabados.',
      features: ['DVH', 'Corredizas', 'Oscilobatientes', 'Paños fijos'],
    },
    {
      icon: <FaDoorOpen className="text-5xl" />,
      title: 'Puertas y Portones',
      description:
        'Puertas de entrada, portones automatizados y cerramientos de seguridad.',
      features: ['Automáticas', 'Blindadas', 'Vidriadas', 'A medida'],
    },
    {
      icon: <FaShieldAlt className="text-5xl" />,
      title: 'Cerramientos',
      description:
        'Cerramientos de balcones, terrazas y espacios exteriores con máxima durabilidad.',
      features: ['Balcones', 'Terrazas', 'Galerías', 'Patios'],
    },
    {
      icon: <FaRegSnowflake className="text-5xl" />,
      title: 'Vidrios DVH',
      description:
        'Doble vidriado hermético para máximo aislamiento térmico y acústico.',
      features: ['Bajo emisivo', 'Templado', 'Laminado', 'Control solar'],
    },
    {
      icon: <FaPaintRoller className="text-5xl" />,
      title: 'Diseño Personalizado',
      description:
        'Creamos diseños únicos adaptados a tu estilo y necesidades específicas.',
      features: ['Renders 3D', 'Asesoramiento', 'Medidas exactas', 'Variedad de colores'],
    },
    {
      icon: <FaTools className="text-5xl" />,
      title: 'Instalación y Mantenimiento',
      description:
        'Servicio completo de instalación profesional y mantenimiento preventivo.',
      features: ['Instalación', 'Reparación', 'Mantenimiento', 'Garantía'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
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

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-deep">Nuestros</span>{' '}
            <span className="text-primary">Servicios</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100px' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-white mx-auto mb-6"
          />
          <p className="text-text/70 text-lg max-w-3xl mx-auto">
            Soluciones integrales en vidriería y herrería de aluminio. Calidad
            premium y diseños a medida para cada proyecto.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                {/* Hover Background Effect */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-white rounded-full blur-2xl"
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-primary mb-6 inline-block"
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-deep mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text/60 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center text-sm text-text/60"
                      >
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-3" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full bg-white/10 hover:bg-white text-deep border border-primary/30 hover:border-primary px-6 py-3 rounded-full font-semibold transition-all duration-300"
                  >
                    Consultar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-text/70 mb-6 text-lg">
            ¿No encontraste lo que buscabas? Trabajamos con proyectos personalizados
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-deep px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all duration-300 shadow-lg"
          >
            Contactanos para un proyecto a medida
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
