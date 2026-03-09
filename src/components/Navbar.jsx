import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const lastY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
    // Hide on scroll down, show on scroll up
    if (latest > 300 && latest > lastY.current) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    lastY.current = latest
  })

  const menuItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Diseñador', href: '#designer' },
    { name: 'Galería', href: '#gallery' },
    { name: 'Contacto', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden && !isOpen ? -100 : 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-deep/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(30,58,138,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.03 }}
            className="flex items-center"
          >
            <img
              src="/logo.png"
              alt="Da Vinci Aberturas"
              className="h-16"
            />
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.08 }}
                className="relative text-white/80 hover:text-white transition-colors duration-300 font-medium text-sm tracking-wide uppercase px-4 py-2 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent group-hover:w-3/4 transition-all duration-300" />
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="ml-4 bg-accent text-deep px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:bg-white hover:text-deep transition-all duration-300 shadow-[0_0_20px_rgba(78,214,241,0.3)]"
            >
              Solicitar Presupuesto
            </motion.a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden text-white text-2xl focus:outline-none hover:text-accent transition-colors p-2"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-deep/98 backdrop-blur-xl border-t border-accent/10"
          >
            <div className="px-6 py-8 space-y-2">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block text-white/80 hover:text-accent transition-colors duration-300 py-3 font-medium text-lg border-b border-white/5"
                >
                  {item.name}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-accent text-deep px-6 py-4 rounded-xl font-bold hover:bg-white transition-all duration-300 text-center mt-4"
              >
                Solicitar Presupuesto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
