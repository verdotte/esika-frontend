/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useMemo } from 'react';
import AgentCard from 'app/modules/__modules__/_Cards/AgentCard';
import { useHome } from 'app/modules/Contexts/HomeContext';
import Paginate from 'app/modules/utils/helpers/paginator';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { HeroCarouselIndicator } from '../HeroCarousel/Indicator';

const AgentContainer = () => {
  const { agents, loading, paginationIndicators, onIndicatorChange } =
    useHome();
  const { agentsIndicator: indicator } = paginationIndicators;

  const agentChunks = useMemo(() => Paginate(agents, 6), [agents]);

  const onIndicatorClick = useCallback(
    (position: number) => {
      onIndicatorChange(position, 'agentsIndicator');
    },
    [onIndicatorChange],
  );

  if (!loading && !agentChunks.length) {
    return null;
  }

  return (
    <div className="w-full my-8 px-3 md:px-0">
      <div className="my-4">
        <p className="font-extrabold text-4xl">Les Agents</p>
        <p className="text-sm">Les agent les plus surs de Esika.</p>
      </div>

      <div className="w-full grid md:grid-cols-2 md:gap-x-3 lg:grid-cols-3 gap-5 lg:gap-x-12 my-8">
        {agentChunks[indicator] &&
          agentChunks[indicator].map((agent, index) => (
            <AgentCard
              key={`agent_${agent.userId}_${index}`}
              data={agent}
              preload={loading}
            />
          ))}
      </div>

      <ShowWidget
        condition={agentChunks.length > 1}
        fallback={<div className="h-8" />}
      >
        <div className="w-full">
          {agentChunks.map((_, index) => (
            <HeroCarouselIndicator
              key={index}
              position={index}
              current={indicator === index}
              defaultStyle="w-4"
              currentStyle="w-10 bg-brand-bold"
              className="h-4 border border-brand-bold rounded-full mr-3"
              onClick={onIndicatorClick}
            />
          ))}
        </div>
      </ShowWidget>
    </div>
  );
};

export default AgentContainer;
