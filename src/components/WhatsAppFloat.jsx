import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppFloat = () => {
  return (
    <motion.a
      href="https://wa.me/5491161549740?text=Hola!%20Quisiera%20consultar%20sobre%20sus%20servicios"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 left-8 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#25D366]/30 z-50 hover:shadow-[#25D366]/50 transition-shadow duration-300"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </motion.a>
  )
}

export default WhatsAppFloat
