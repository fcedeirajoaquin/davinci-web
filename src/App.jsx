import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Testimonials from './components/Testimonials'
import ParallaxCTA from './components/ParallaxCTA'
import Designer from './components/Designer'
import WhatsAppFloat from './components/WhatsAppFloat'
import FAQ from './components/FAQ'

function App() {
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
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Designer />
        <ParallaxCTA />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App
