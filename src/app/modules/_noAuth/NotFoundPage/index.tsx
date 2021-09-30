import React, { useEffect } from 'react';
import Header from 'app/modules/__modules__/Header';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import SearchContainer from 'app/modules/__modules__/SearchContainer';
import { useSearch } from 'app/modules/Contexts/SearchContext';
import { useHome } from 'app/modules/Contexts/HomeContext';

const NotFoundPage = () => {
  const { isVisible, onToggleVisibility } = useSearch();
  const { onFetchProperties, onFetchAgents, agents, properties } =
    useHome();

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
      <div className="h-full w-full mt-[4.5rem] md:mt-4 my-4 mx-auto flex justify-center items-center">
        <div className="h-14 pr-4 border-r border-gray-400 flex justify-center items-center">
          <p className="text-[1.4rem] sm:text-xl text-gray-800">
            404
          </p>
        </div>
        <div className="h-14 pl-4 flex justify-center items-center">
          <p className="text-[1.2rem] sm:text-xl text-gray-800">
            Page introuvable
          </p>
        </div>
      </div>

      <BottomNavbar />
      <SearchContainer
        show={isVisible}
        onClose={onToggleVisibility}
      />
    </div>
  );
};

export default NotFoundPage;
