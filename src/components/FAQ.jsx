import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import TextReveal from './TextReveal'

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="border-b border-primary/10 last:border-0"
  >
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-5 text-left group"
    >
      <span className="text-deep font-semibold text-base pr-4 group-hover:text-primary transition-colors">
        {question}
      </span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0 text-primary/50"
      >
        <FaChevronDown className="text-sm" />
      </motion.span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-text/60 text-sm leading-relaxed pb-5">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

const FAQ = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: '¿Qué tipos de aluminio utilizan?',
      answer: 'Trabajamos con aluminio de primera calidad, incluyendo líneas Modena, Herrero y A30 New. Todos nuestros perfiles son de origen nacional certificado, garantizando durabilidad y resistencia a la intemperie.',
    },
    {
      question: '¿Cuánto tiempo tarda un proyecto?',
      answer: 'Los tiempos varían según la complejidad del proyecto. Una ventana estándar puede estar lista en 7-10 días hábiles, mientras que proyectos más grandes como cerramientos completos pueden tomar entre 15-30 días. Siempre proporcionamos un cronograma detallado al inicio.',
    },
    {
      question: '¿Ofrecen garantía en sus trabajos?',
      answer: 'Sí, todos nuestros trabajos incluyen garantía. Los perfiles de aluminio tienen garantía de 10 años, los vidrios DVH 5 años, y la mano de obra de instalación 2 años. Además, brindamos servicio de mantenimiento post-instalación.',
    },
    {
      question: '¿Qué es el vidrio DVH y por qué conviene?',
      answer: 'El DVH (Doble Vidriado Hermético) consiste en dos vidrios separados por una cámara de aire seco. Esto proporciona un aislamiento térmico y acústico superior, reduciendo hasta un 50% la pérdida de energía y disminuyendo significativamente el ruido exterior.',
    },
    {
      question: '¿Hacen trabajos a medida?',
      answer: 'Absolutamente. Cada proyecto es único y nos adaptamos a las medidas y diseños específicos que necesites. Ofrecemos asesoramiento personalizado, renders 3D y una amplia variedad de colores y acabados para que el resultado sea exactamente lo que imaginás.',
    },
    {
      question: '¿Cuál es la zona de cobertura?',
      answer: 'Trabajamos en CABA y zona norte. Nuestra base está en Belgrano pero realizamos instalaciones en todo Capital Federal, Vicente López, San Isidro, Olivos, Martínez y alrededores. Para proyectos más alejados, consultanos y evaluamos la viabilidad.',
    },
  ]

  return (
    <section className="py-24 bg-background relative overflow-hidden grid-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary/60 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-deep mb-6">
            <TextReveal as="span" className="text-deep">Preguntas </TextReveal>
            <TextReveal as="span" className="text-primary" delay={0.2}>Frecuentes</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-accent mx-auto mb-6"
          />
          <p className="text-text/60 text-lg max-w-2xl mx-auto">
            Respondemos las consultas más comunes sobre nuestros servicios
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-primary/5"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-text/50 mb-4">
            ¿Tenés otra pregunta?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-deep transition-all duration-300 shadow-md shadow-primary/20"
          >
            Consultanos
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
