import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  FaPhone,
  FaEnvelope,
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
    // WhatsApp message
    const message = `Hola! Mi nombre es ${formData.name}. ${formData.message}`
    const whatsappUrl = `https://wa.me/5491133333333?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl" />,
      title: 'Teléfono',
      info: '+54 11 3333-3333',
      link: 'tel:+5491133333333',
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      title: 'WhatsApp',
      info: 'Chatea con nosotros',
      link: 'https://wa.me/5491133333333',
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: 'Ubicación',
      info: 'Amenabar 1929, Módena',
      link: 'https://maps.google.com/?q=Amenabar+1929+Buenos+Aires',
    },
    {
      icon: <FaInstagram className="text-2xl" />,
      title: 'Instagram',
      info: '@davinci_vidrieriayherreria',
      link: 'https://www.instagram.com/davinci_vidrieriayherreria/',
    },
  ]

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-davinci/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [0, -180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-davinci/5 rounded-full blur-3xl"
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
            <span className="text-deep">Contactanos</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100px' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-davinci mx-auto mb-6"
          />
          <p className="text-text/70 text-lg max-w-3xl mx-auto">
            ¿Tenés un proyecto en mente? Escribinos y te respondemos a la brevedad
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/10"
            >
              <h3 className="text-2xl font-bold text-deep mb-6">
                Solicitar Presupuesto
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-text/70 mb-2 font-medium">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-primary/20 rounded-lg text-deep placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300"
                    placeholder="Juan Pérez"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-text/70 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-primary/20 rounded-lg text-deep placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300"
                    placeholder="juan@email.com"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-text/70 mb-2 font-medium">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 border border-primary/20 rounded-lg text-deep placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300"
                    placeholder="+54 11 1234-5678"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-text/70 mb-2 font-medium">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-white/50 border border-primary/20 rounded-lg text-deep placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300 resize-none"
                    placeholder="Contanos sobre tu proyecto..."
                  />
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-davinci text-deep py-4 rounded-lg font-bold text-lg hover:bg-gradient-davinci/90 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-2xl" />
                  Enviar por WhatsApp
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-6 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0 w-16 h-16 bg-gradient-davinci/10 rounded-full flex items-center justify-center text-primary group-hover:bg-gradient-davinci group-hover:text-deep transition-all duration-300"
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h4 className="text-deep font-bold mb-1">{item.title}</h4>
                  <p className="text-text/60 group-hover:text-primary transition-colors">
                    {item.info}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Map Placeholder */}
            <motion.div
              variants={itemVariants}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 h-64 flex items-center justify-center"
            >
              <div className="text-center">
                <FaMapMarkerAlt className="text-primary text-5xl mx-auto mb-4" />
                <p className="text-text/70 font-semibold">Amenabar 1929</p>
                <p className="text-text/60">Módena, Buenos Aires</p>
                <motion.a
                  href="https://maps.google.com/?q=Amenabar+1929+Buenos+Aires"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="inline-block mt-4 text-primary hover:underline"
                >
                  Ver en Google Maps →
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
