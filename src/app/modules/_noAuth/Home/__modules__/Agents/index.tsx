/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import AgentCard from 'app/modules/__modules__/_Cards/AgentCard';
import { useHome } from 'app/modules/Contexts/HomeContext';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';

const AgentContainer = () => {
  const { agents, loading } = useHome();

  return (
    <div className="w-full my-8 px-3 md:px-0">
      <div className="my-4">
        <p className="font-extrabold text-4xl">Les Agents</p>
        <p className="text-sm">Les agent les plus surs de Esika.</p>
      </div>

      <div className="w-full grid md:grid-cols-2 md:gap-x-3 lg:grid-cols-3 gap-5 lg:gap-x-12 my-8">
        {agents.map((agent, index) => (
          <AgentCard
            key={`agent_${agent.userId}_${index}`}
            data={agent}
            preload={loading}
          />
        ))}
      </div>
      <div className="w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <HeroCarouselIndicator
            key={index}
            position={index}
            current={index === 2}
            defaultStyle="w-4"
            currentStyle="w-10 bg-brand-bold"
            className="h-4 border border-brand-bold rounded-full mr-3"
            onClick={() => null}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentContainer;
