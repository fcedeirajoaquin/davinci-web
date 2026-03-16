import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { FaExpand, FaInstagram, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import TextReveal from './TextReveal'
import { useContent } from '../context/ContentContext'

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
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const { content } = useContent()
  const c = content.gallery

  const galleryItems = useMemo(() => {
    return (c.items || []).map((item, i) => ({
      id: i + 1,
      category: item.category,
      title: item.title,
      image: item.imageUrl,
    }))
  }, [c.items])

  const categories = useMemo(() => {
    return [
      { id: 'all', name: 'Todos' },
      ...(c.categories || []),
    ]
  }, [c.categories])

  const filteredItems = useMemo(() => {
    return selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)
  }, [selectedCategory, galleryItems])

  const navigateLightbox = useCallback((direction) => {
    if (lightboxIndex === null) return
    const newIndex = (lightboxIndex + direction + filteredItems.length) % filteredItems.length
    setLightboxIndex(newIndex)
  }, [lightboxIndex, filteredItems])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') navigateLightbox(-1)
      if (e.key === 'ArrowRight') navigateLightbox(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, navigateLightbox])

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
            {c.sectionLabel}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-deep mb-6">
            <TextReveal as="span" className="text-deep">{c.titlePart1}</TextReveal>
            <TextReveal as="span" className="text-primary" delay={0.2}>{c.titlePart2}</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-accent mx-auto mb-6"
          />
          <p className="text-text/60 text-lg max-w-2xl mx-auto">
            {c.subtitle}
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
          {filteredItems.map((galleryItem, idx) => (
            <motion.div
              key={galleryItem.id}
              variants={item}
              layout
            >
              <TiltCard className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div onClick={() => setLightboxIndex(idx)} className="absolute inset-0">
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
            {c.instagramText}
          </p>
          <motion.a
            href={c.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-600/20"
          >
            <FaInstagram className="text-xl" />
            {c.instagramCta}
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl z-10"
              aria-label="Cerrar"
            >
              <FaTimes />
            </motion.button>

            {/* Navigation arrows */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1) }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
              aria-label="Imagen anterior"
            >
              <FaChevronLeft />
            </motion.button>
            <motion.button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1) }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
              aria-label="Imagen siguiente"
            >
              <FaChevronRight />
            </motion.button>

            <motion.div
              key={filteredItems[lightboxIndex].id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] cursor-default"
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl p-6">
                <h3 className="text-white font-bold text-xl">{filteredItems[lightboxIndex].title}</h3>
                <p className="text-white/50 text-sm mt-1">{lightboxIndex + 1} / {filteredItems.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
