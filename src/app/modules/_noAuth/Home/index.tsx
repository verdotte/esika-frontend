import React from 'react';
import Header from 'app/modules/__modules__/Header';
import HeroCarouselContainer from './__modules__/HeroCarouselContainer';
import { ExplorerPanel } from './__modules__/Explorer';
import AgentContainer from './__modules__/Agents';
import Footer from './__modules__/Footer';

const HomePage = () => {
  return (
    <div className="container mx-auto px-0 md:px-8">
      <Header />
      <HeroCarouselContainer />
      <ExplorerPanel />
      <AgentContainer />
      <Footer />
    </div>
  );
};

export default HomePage;
