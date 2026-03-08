import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const TextReveal = ({ children, className = '', as: Tag = 'span', delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const text = typeof children === 'string' ? children : ''
  const words = text.split(' ')

  if (!text) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay }}
        className={className}
      >
        {children}
      </motion.span>
    )
  }

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.08,
            ease: 'easeOut',
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}

export default TextReveal
