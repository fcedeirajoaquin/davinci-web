import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollProgress from './components/ScrollProgress'
import WhatsAppFloat from './components/WhatsAppFloat'

const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./components/Services'))
const Designer = lazy(() => import('./components/Designer'))
const ParallaxCTA = lazy(() => import('./components/ParallaxCTA'))
const Gallery = lazy(() => import('./components/Gallery'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const FAQ = lazy(() => import('./components/FAQ'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const Admin = lazy(() => import('./components/Admin'))

function LandingPage() {
  return (
    <div className="App relative">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-accent focus:text-deep focus:px-6 focus:py-3 focus:rounded-xl focus:font-bold focus:shadow-lg"
      >
        Saltar al contenido
      </a>
      <ScrollProgress />
      <WhatsAppFloat />
      <Navbar />
      <Suspense fallback={null}>
        <main className="relative z-10">
          <Hero />
          <About />
          <Services />
          <Designer />
          <ParallaxCTA />
          <Gallery />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </Suspense>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/admin"
        element={
          <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Cargando...</div>}>
            <Admin />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
