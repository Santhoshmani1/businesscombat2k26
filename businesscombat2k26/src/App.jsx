import "./index.css"
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import RoundsSection from './components/sections/RoundsSection'
import PricingSection from './components/sections/PricingSection'
import InstructionsSection from './components/sections/InstructionsSection'
import CoordinatorsSection from './components/sections/CoordinatorsSection'
import FinalCTASection from './components/sections/FinalCTASection'

function App() {
  return (
    <div className="min-h-screen bg-base-black">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <RoundsSection />
        <PricingSection />
        <InstructionsSection />
        <CoordinatorsSection />
        <FinalCTASection />
      </main>  
      
      <Footer />
    </div>
  )
}

export default App