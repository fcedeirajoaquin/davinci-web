import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaExpand, FaInstagram, FaTimes } from 'react-icons/fa'
import TextReveal from './TextReveal'

const TiltCard = ({ children, className }) => {
  const ref = useRef(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig)

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const Gallery = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'windows', name: 'Ventanas' },
    { id: 'doors', name: 'Puertas' },
    { id: 'closures', name: 'Cerramientos' },
  ]

  const galleryItems = [
    { id: 1, category: 'windows', title: 'Ventana Corrediza DVH', image: '/images/ventana-corrediza.jpg' },
    { id: 2, category: 'doors', title: 'Puerta Principal Vidriada', image: '/images/puerta-vidriada.jpg' },
    { id: 3, category: 'closures', title: 'Cerramiento de Balcon', image: '/images/cerramiento-balcon.jpg' },
    { id: 4, category: 'windows', title: 'Ventana Oscilobatiente', image: '/images/ventana-oscilobatiente.jpg' },
    { id: 5, category: 'doors', title: 'Porton Automatico', image: '/images/porton-automatico.jpg' },
    { id: 6, category: 'closures', title: 'Cerramiento de Terraza', image: '/images/cerramiento-terraza.jpg' },
    { id: 7, category: 'windows', title: 'Ventana de Pano Fijo', image: '/images/ventana-pano-fijo.jpg' },
    { id: 8, category: 'doors', title: 'Puerta Corrediza Pesada', image: '/images/puerta-corrediza.jpg' },
  ]

  const filteredItems =
    selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const item = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section id="gallery" className="py-24 bg-background relative overflow-hidden grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-primary/60 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-deep mb-6">
            <TextReveal as="span" className="text-deep">Nuestros </TextReveal>
            <TextReveal as="span" className="text-primary" delay={0.2}>Trabajos</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-accent mx-auto mb-6"
          />
          <p className="text-text/60 text-lg max-w-2xl mx-auto">
            Explora nuestra galeria de proyectos realizados. Cada trabajo refleja
            nuestro compromiso con la excelencia.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white text-text/60 hover:text-primary border border-primary/10 hover:border-primary/30'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid with 3D Tilt */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filteredItems.map((galleryItem) => (
            <motion.div
              key={galleryItem.id}
              variants={item}
              layout
            >
              <TiltCard className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div onClick={() => setLightbox(galleryItem)} className="absolute inset-0">
                  <img
                    src={galleryItem.image}
                    alt={galleryItem.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-deep/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center p-6">
                    <FaExpand className="text-accent text-2xl mb-4" />
                    <h3 className="text-white font-bold text-base mb-3 text-center">
                      {galleryItem.title}
                    </h3>
                    <span className="text-accent text-xs font-semibold border border-accent/30 px-4 py-2 rounded-full">
                      Ver en grande
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-14"
        >
          <p className="text-text/50 mb-5">
            Te gustaria ver mas de nuestros trabajos?
          </p>
          <motion.a
            href="https://www.instagram.com/davinci_vidrieriayherreria/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-600/20"
          >
            <FaInstagram className="text-xl" />
            Siguenos en Instagram
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl z-10"
            >
              <FaTimes />
            </motion.button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] cursor-default"
            >
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl p-6">
                <h3 className="text-white font-bold text-xl">{lightbox.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
