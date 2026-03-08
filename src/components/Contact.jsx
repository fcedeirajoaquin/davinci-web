import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import TextReveal from './TextReveal'
import {
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = `Hola! Mi nombre es ${formData.name}. ${formData.message}`
    const whatsappUrl = `https://wa.me/5491161549740?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    { icon: <FaPhone className="text-xl" />, title: 'Telefono', info: '011 6154-9740', link: 'tel:+5491161549740' },
    { icon: <FaWhatsapp className="text-xl" />, title: 'WhatsApp', info: 'Chatea con nosotros', link: 'https://wa.me/5491161549740' },
    { icon: <FaMapMarkerAlt className="text-xl" />, title: 'Ubicacion', info: 'Amenabar 1929, Modena', link: 'https://maps.google.com/?q=Amenabar+1929+Buenos+Aires' },
    { icon: <FaInstagram className="text-xl" />, title: 'Instagram', info: '@davinci_vidrieriayherreria', link: 'https://www.instagram.com/davinci_vidrieriayherreria/' },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  const inputClasses = "w-full px-4 py-3.5 bg-white border border-deep/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 text-sm"
  const darkInputClasses = "w-full px-4 py-3.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 text-sm"

  return (
    <section id="contact" className="py-24 bg-deep relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 diagonal-lines" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent/60 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Hablemos
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
            <TextReveal as="span" className="text-white">Contactanos</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-accent mx-auto mb-6"
          />
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Tenes un proyecto en mente? Escribinos y te respondemos a la brevedad
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div
              variants={item}
              className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.06]"
            >
              <h3 className="text-2xl font-display text-white mb-8">
                Solicitar Presupuesto
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-white/50 mb-2 text-sm font-medium">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={darkInputClasses}
                    placeholder="Juan Perez"
                  />
                </div>

                <div>
                  <label className="block text-white/50 mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={darkInputClasses}
                    placeholder="juan@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white/50 mb-2 text-sm font-medium">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={darkInputClasses}
                    placeholder="+54 11 1234-5678"
                  />
                </div>

                <div>
                  <label className="block text-white/50 mb-2 text-sm font-medium">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className={`${darkInputClasses} resize-none`}
                    placeholder="Contanos sobre tu proyecto..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-accent text-deep py-4 rounded-xl font-bold text-base hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(78,214,241,0.2)] flex items-center justify-center gap-3"
                >
                  <FaWhatsapp className="text-xl" />
                  Enviar por WhatsApp
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
                whileHover={{ x: 6 }}
                className="flex items-center gap-5 bg-white/[0.04] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:border-accent/20 hover:bg-white/[0.08] transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent/70 group-hover:bg-accent group-hover:text-deep transition-all duration-300">
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-0.5">{info.title}</h4>
                  <p className="text-white/40 text-sm group-hover:text-accent/70 transition-colors">
                    {info.info}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Map */}
            <motion.div
              variants={item}
              className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.06] flex items-center justify-center"
              style={{ minHeight: '200px' }}
            >
              <div className="text-center">
                <FaMapMarkerAlt className="text-accent text-4xl mx-auto mb-4" />
                <p className="text-white font-semibold">Amenabar 1929</p>
                <p className="text-white/40 text-sm mb-4">Modena, Buenos Aires</p>
                <motion.a
                  href="https://maps.google.com/?q=Amenabar+1929+Buenos+Aires"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className="inline-block text-accent text-sm font-semibold hover:underline"
                >
                  Ver en Google Maps
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
