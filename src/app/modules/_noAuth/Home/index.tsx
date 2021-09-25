import React, { useEffect } from 'react';
import Header from 'app/modules/__modules__/Header';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import { useHome } from 'app/modules/Contexts/HomeContext';
import SearchContainer from 'app/modules/__modules__/SearchContainer';
import { useSearch } from 'app/modules/Contexts/SearchContext';
import HeroCarouselContainer from './__modules__/HeroCarouselContainer';
import ExplorerPanel from './__modules__/Explorer';
import AgentContainer from './__modules__/Agents';
import Footer from './__modules__/Footer';

const HomePage = () => {
  const { onFetchProperties, onFetchAgents, agents, properties } =
    useHome();
  const { isVisible, onToggleVisibility } = useSearch();

  useEffect(() => {
    if (!properties.length) {
      onFetchProperties();
    }
    if (!agents.length) {
      onFetchAgents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchProperties]);

  return (
    <div className="container mx-auto px-0 md:px-8 no-scrollbars">
      <Header
        className="fixed md:sticky z-20 md:z-10 top-0"
        onSearchClick={onToggleVisibility}
      />
      <HeroCarouselContainer />
      <ExplorerPanel />
      <AgentContainer />
      <Footer />
      <BottomNavbar />
      <SearchContainer
        show={isVisible}
        onClose={onToggleVisibility}
      />
    </div>
  );
};

export default HomePage;
