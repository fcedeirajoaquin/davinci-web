import { motion } from 'framer-motion'
import {
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Galería', href: '#gallery' },
    { name: 'Contacto', href: '#contact' },
  ]

  const socialLinks = [
    {
      icon: <FaInstagram className="text-2xl" />,
      href: 'https://www.instagram.com/davinci_vidrieriayherreria/',
      label: 'Instagram',
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      href: 'https://wa.me/5491133333333',
      label: 'WhatsApp',
    },
  ]

  return (
    <footer className="bg-deep border-t border-primary/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-davinci rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-deep">DA VINCI</span>{' '}
                <span className="text-primary">ABERTURAS</span>
              </h3>
              <p className="text-text/60 mb-4 max-w-md">
                Creadores de espacios únicos. Especializados en vidriería y
                herrería de aluminio con más de 10 años de experiencia en el
                rubro.
              </p>
              <div className="space-y-2 text-text/60">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>Amenabar 1929, Módena</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-primary" />
                  <a
                    href="tel:+5491133333333"
                    className="hover:text-primary transition-colors"
                  >
                    +54 11 3333-3333
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
            <h4 className="text-deep font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-text/60 hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-deep font-bold mb-4">Síguenos</h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gradient-davinci/10 border border-primary/30 rounded-full flex items-center justify-center text-primary hover:bg-gradient-davinci hover:text-deep transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-davinci text-deep px-6 py-3 rounded-full font-semibold hover:bg-gradient-davinci/90 transition-all duration-300 text-sm"
            >
              Solicitar Presupuesto
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-text/60 text-sm text-center md:text-left">
            © {currentYear} Da Vinci Vidriería y Herrería. Todos los derechos
            reservados.
          </p>
          <p className="text-text/60 text-sm flex items-center gap-2">
            Hecho con <FaHeart className="text-primary" /> en Buenos Aires
          </p>
        </motion.div>

        {/* Back to Top Button */}
        <motion.a
          href="#hero"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-davinci rounded-full flex items-center justify-center text-deep shadow-lg hover:bg-gradient-davinci/90 transition-all duration-300 z-50"
          aria-label="Volver arriba"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.a>
      </div>
    </footer>
  )
}

export default Footer
