import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaExpand } from 'react-icons/fa'

const Gallery = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'windows', name: 'Ventanas' },
    { id: 'doors', name: 'Puertas' },
    { id: 'closures', name: 'Cerramientos' },
  ]

  // Gallery items with placeholder gradients (replace with real images)
  const galleryItems = [
    {
      id: 1,
      category: 'windows',
      title: 'Ventana Corrediza DVH',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      id: 2,
      category: 'doors',
      title: 'Puerta Principal Vidriada',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      id: 3,
      category: 'closures',
      title: 'Cerramiento de Balcón',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      id: 4,
      category: 'windows',
      title: 'Ventana Oscilobatiente',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      id: 5,
      category: 'doors',
      title: 'Portón Automático',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 6,
      category: 'closures',
      title: 'Cerramiento de Terraza',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      id: 7,
      category: 'windows',
      title: 'Ventana de Paño Fijo',
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      id: 8,
      category: 'doors',
      title: 'Puerta Corrediza Pesada',
      gradient: 'from-lime-500 to-green-600',
    },
  ]

  const filteredItems =
    selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="gallery" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-deep">Nuestros</span>{' '}
            <span className="text-primary">Trabajos</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100px' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-white mx-auto mb-6"
          />
          <p className="text-text/70 text-lg max-w-3xl mx-auto">
            Explora nuestra galería de proyectos realizados. Cada trabajo refleja
            nuestro compromiso con la excelencia.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-white text-deep shadow-lg'
                  : 'bg-white/50 text-text/70 hover:bg-white border border-primary/20'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Image Placeholder with Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-6 transition-opacity duration-300"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <FaExpand className="text-primary text-3xl mb-4 mx-auto" />
                  <h3 className="text-deep font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="text-primary text-sm font-semibold border border-primary px-4 py-2 rounded-full hover:bg-white hover:text-deep transition-all duration-300"
                  >
                    Ver detalles
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Corner decoration */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-text/70 mb-4">
            ¿Te gustaría ver más de nuestros trabajos?
          </p>
          <motion.a
            href="https://www.instagram.com/davinci_vidrieriayherreria/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-deep px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all duration-300 shadow-lg"
          >
            Síguenos en Instagram
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery
