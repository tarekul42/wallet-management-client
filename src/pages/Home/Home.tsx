import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import ServicesSection from "./ServicesSection";
import FooterCTA from "./FooterCTA";
import HomeCTASection from "./HomeCTASection";
import TrustAndSecurity from "./TrustAndSecurity";
import Testimonials from "./Testimonials";
import HowItWorks from "./HowItWorks";
import FeaturesSection from "./FeaturesSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Services Section */}
      <ServicesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* Trust & Security */}
      <TrustAndSecurity />

      {/* CTA Section */}
      <HomeCTASection />

      {/* Footer CTA */}
      <FooterCTA />
    </div>
  );
};

export default Home;
