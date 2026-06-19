import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import HomeCTASection from "./HomeCTASection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <HomeCTASection />
    </div>
  );
};

export default Home;
