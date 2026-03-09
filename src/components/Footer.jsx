import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import {
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaChevronUp,
} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShowBackToTop(latest > 400)
  })

  const quickLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Galería', href: '#gallery' },
    { name: 'Contacto', href: '#contact' },
  ]

  const socialLinks = [
    { icon: <FaInstagram className="text-xl" />, href: 'https://www.instagram.com/davinci_vidrieríayherrería/', label: 'Instagram' },
    { icon: <FaWhatsapp className="text-xl" />, href: 'https://wa.me/5491161549740', label: 'WhatsApp' },
  ]

  return (
    <footer className="bg-[#0F1F4A] relative overflow-hidden">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-5">
                <img src="/logo.png" alt="Da Vinci" className="h-10" />
                <div>
                  <span className="text-white font-bold text-lg tracking-tight block leading-tight">DA VINCI</span>
                  <span className="text-accent/60 font-medium text-xs tracking-[0.15em] uppercase">Aberturas</span>
                </div>
              </div>
              <p className="text-white/40 mb-6 max-w-md leading-relaxed text-sm">
                Creadores de espacios únicos. Especializados en vidriería y
                herrería de aluminio con mas de 10 años de experiencia.
              </p>
              <div className="space-y-2.5 text-white/40 text-sm">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-accent/60 flex-shrink-0" />
                  <span>Amenábar 1929, Belgrano</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-accent/60 flex-shrink-0" />
                  <a href="tel:+5491161549740" className="hover:text-accent transition-colors">
                    011 6154-9740
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Enlaces</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-accent transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Seguinos</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/[0.06] border border-white/10 rounded-xl flex items-center justify-center text-white/50 hover:bg-accent hover:text-deep hover:border-accent transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-block bg-accent/10 text-accent border border-accent/20 px-5 py-2.5 rounded-xl font-semibold hover:bg-accent hover:text-deep transition-all duration-300 text-sm"
            >
              Solicitar Presupuesto
            </a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm text-center md:text-left">
            {currentYear} Da Vinci Vidrieria y Herreria. Todos los derechos reservados.
          </p>
          <a
            href="https://ferced.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors duration-300"
          >
            <span className="text-xs tracking-wide">Powered by</span>
            <img src="/ferced-logo.png" alt="Ferced" className="h-5 w-5 opacity-50 hover:opacity-80 transition-opacity" />
            <span className="text-sm font-semibold tracking-tight">ferced</span>
          </a>
        </div>
      </div>

      {/* Back to Top */}
      <motion.a
        href="#hero"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showBackToTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8, pointerEvents: 'none' }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 w-11 h-11 bg-accent/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-deep shadow-lg shadow-accent/20 hover:bg-accent transition-all duration-300 z-50"
        aria-label="Volver arriba"
      >
        <FaChevronUp className="text-sm" />
      </motion.a>
    </footer>
  )
}

export default Footer
