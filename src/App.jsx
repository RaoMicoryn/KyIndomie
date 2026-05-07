import './styles/globals.css';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HorizontalSection from './components/HorizontalSection';
import StatsSection from './components/StatsSection';
import LayeredCardsSection from './components/LayeredCardsSection';
import CTASection from './components/CTAsection';

function App() {
  return (
    <main>
      {/* Section 1 — Hero Intro */}
      <HeroSection />
      
      {/* Section 2 — Features Reveal */}
      <FeaturesSection />
      
      {/* Section 3 — Horizontal Scroll */}
      <HorizontalSection />

      {/* Section 4 — Stats & Testimonials */}
      <StatsSection />

      {/* Section 5 — Layered Cards */}
      <LayeredCardsSection />

      {/* Section 6 — Call to Action */}
      <CTASection />

    </main>
  );
}

export default App;
