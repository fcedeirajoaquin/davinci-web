import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import TextReveal from './TextReveal'
import { useContent } from '../context/ContentContext'
import {
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { content } = useContent()
  const c = content.contact
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    let message = `Hola! Mi nombre es ${formData.name}.`
    if (formData.email) message += `\nEmail: ${formData.email}`
    if (formData.phone) message += `\nTeléfono: ${formData.phone}`
    message += `\n\n${formData.message}`
    const whatsappUrl = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    { icon: <FaPhone className="text-xl" />, title: 'Teléfono', info: c.phone, link: `tel:+${c.whatsappNumber}` },
    { icon: <FaWhatsapp className="text-xl" />, title: 'WhatsApp', info: c.whatsappLabel, link: `https://wa.me/${c.whatsappNumber}` },
    { icon: <FaMapMarkerAlt className="text-xl" />, title: 'Ubicación', info: c.address, link: `https://maps.google.com/?q=${encodeURIComponent(c.address)}` },
    { icon: <FaInstagram className="text-xl" />, title: 'Instagram', info: c.instagram, link: c.instagramUrl },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  const inputClasses = "w-full px-4 py-3.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 text-sm"

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
            {c.sectionLabel}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
            <TextReveal as="span" className="text-white">{c.title}</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-accent mx-auto mb-6"
          />
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {c.subtitle}
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
                {c.formTitle}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-white/50 mb-2 text-sm font-medium">
                    Nombre completo
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="Juan Perez"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-white/50 mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="juan@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-white/50 mb-2 text-sm font-medium">
                    Teléfono
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="+54 11 1234-5678"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-white/50 mb-2 text-sm font-medium">
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className={`${inputClasses} resize-none`}
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
                  <p className="text-white/60 text-sm group-hover:text-accent/70 transition-colors">
                    {info.info}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Map */}
            <motion.div
              variants={item}
              className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.06] overflow-hidden"
              style={{ minHeight: '240px' }}
            >
              <iframe
                title="Ubicación Da Vinci Aberturas"
                src={`https://www.google.com/maps?q=${c.mapQuery}&z=16&output=embed`}
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
