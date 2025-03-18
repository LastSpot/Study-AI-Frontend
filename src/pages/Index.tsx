
import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {

  useEffect(() => {
    document.title = "Study AI - Homepage";
  }, []);

  const { api } = useAuth();

  useEffect(() => {
    api.get('/').then(() => {
      console.log('Backend server is ready');
    }).catch(() => {
      console.log('Backend server is starting up...');
    });
  }, [api]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
