import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const AnimatedCounter = ({ target, suffix = '', duration = 2000, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const num = parseInt(target)
    if (isNaN(num)) return

    let start = 0
    const increment = num / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= num) {
        setCount(num)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  )
}

export default AnimatedCounter
