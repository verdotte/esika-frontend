import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import Header from 'app/modules/__modules__/Header';
import PropertyCategory from 'app/modules/_noAuth/Home/__modules__/Explorer/PropertyCategory';
import Tag from 'app/modules/__modules__/Tag';
import paths from 'app/Routes/paths';
import CAgentProperties from './Container';

interface IParams {
  category: string;
}

const LinkTag = ({ to, title, current }) => {
  return (
    <Link
      to={to}
      className="lg:min-w-[8rem] flex-shrink-0 first:ml-4 md:first:ml-0"
    >
      <Tag
        tag={title}
        className={`${
          current ? 'bg-brand-bold' : 'bg-brand-thin'
        } hover:bg-brand-bold text-white justify-center p-3`}
      />
    </Link>
  );
};

const AgentPropertiesActivity: FC = () => {
  const { category: categoryParam } = useParams<IParams>();

  return (
    <div className="container mx-auto px-0 md:px-8">
      <Header />
      <div className="my-4">
        <PropertyCategory
          preloadUI={
            <div className="h-6 w-24 rounded-full mx-3 bg-gray-200 animate-pulse" />
          }
          render={(categories) => (
            <>
              <LinkTag
                to={paths.AgentProperties}
                title="Tous"
                current={!categoryParam}
              />
              {categories.map((category) => (
                <LinkTag
                  to={`${paths.AgentProperties}/${category.title}`}
                  key={`category_${category.categoryId}`}
                  title={category.title}
                  current={categoryParam === category.title}
                />
              ))}
            </>
          )}
        />
      </div>
      <div className="my-8 mb-24 md:mb-8">
        <CAgentProperties />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default AgentPropertiesActivity;
