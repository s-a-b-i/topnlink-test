import React from 'react';
import Header from '../components/HomeComponents/Header';
import HeroSection from '../components/HomeComponents/HeroSection';
import StatsSection from '../components/HomeComponents/StatsSection';
import LogosSection from '../components/HomeComponents/LogosSection';
import PlatformWorkflow from '../components/HomeComponents/PlatformWorkflow';
import WhyChooseUs from '../components/HomeComponents/WhyChooseUs';
import Testimonials from '../components/HomeComponents/Testimonials';
import CallToAction from '../components/HomeComponents/CallToAction';
import Footer from '../components/HomeComponents/Footer';

function Home() { // Remove setIsAuthenticated prop
  return (
    <div className="bg-gray-900 text-white font-sans">
      <Header />
      <HeroSection />
      <StatsSection />
      <LogosSection />
      <PlatformWorkflow />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default Home;