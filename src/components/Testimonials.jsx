import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const testimonials = [
    {
      name: 'Maria Gonzalez',
      role: 'Propietaria en Nordelta',
      text: 'Excelente trabajo en todas las ventanas de mi casa. La diferencia en aislación térmica es increible. Muy profesionales y puntuales.',
      stars: 5,
    },
    {
      name: 'Carlos Ruiz',
      role: 'Arquitecto',
      text: 'Trabajo con Da Vinci en todos mis proyectos. La calidad del aluminio y los acabados son superiores. Siempre cumplen con los plazos.',
      stars: 5,
    },
    {
      name: 'Laura Fernandez',
      role: 'Propietaria en Palermo',
      text: 'Cerraron mi balcón y quedo espectacular. El equipo fue muy prolijo y el resultado supero mis expectativas. 100% recomendables.',
      stars: 5,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const item = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const TestimonialCard = ({ testimonial }) => (
    <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.06] hover:border-accent/20 transition-all duration-300 relative h-full">
      <FaQuoteLeft className="text-accent/20 text-3xl mb-4" />
      <p className="text-white/60 leading-relaxed mb-6 text-sm">
        "{testimonial.text}"
      </p>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <FaStar key={i} className="text-accent text-sm" />
        ))}
      </div>
      <div>
        <p className="text-white font-bold text-sm">{testimonial.name}</p>
        <p className="text-white/60 text-xs">{testimonial.role}</p>
      </div>
    </div>
  )

  return (
    <section className="py-24 bg-deep relative overflow-hidden">
      <div className="absolute inset-0 diagonal-lines" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
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
            Testimonios
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
            Lo Que Dicen <span className="text-accent">Nuestros Clientes</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-accent mx-auto mb-6"
          />
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </motion.div>

        {/* Desktop: Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden md:grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -6 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: Carousel */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:hidden"
          >
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex"
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-1">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
                aria-label="Testimonio anterior"
              >
                <FaChevronLeft className="text-sm" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-accent w-6'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Testimonio ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
                aria-label="Testimonio siguiente"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
