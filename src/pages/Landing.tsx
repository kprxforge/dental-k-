import React from 'react';
import { motion } from 'motion/react';
import { Hero } from '../components/landing/Hero';
import { Services } from '../components/landing/Services';
import { Header } from '../components/landing/Header';
import { SmileSimulator } from '../components/landing/SmileSimulator';
import { Chatbot } from '../components/landing/Chatbot';
import { Footer } from '../components/landing/Footer';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-gold/30 selection:text-gold overflow-x-hidden relative">
      <Header />
      <main>
        <Hero />
        <Services />
        <SmileSimulator />
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
};
