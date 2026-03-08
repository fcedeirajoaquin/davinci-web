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

function App() {
  return (
    <div className="App relative">
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
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App
