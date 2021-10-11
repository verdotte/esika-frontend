import { FC } from 'react';
import { Link } from 'react-router-dom';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import Header from 'app/modules/__modules__/Header';
import PropertyCategory from 'app/modules/_noAuth/Home/__modules__/Explorer/PropertyCategory';
import Tag from 'app/modules/__modules__/Tag';
import CAgentProperties from './Container';

const AgentPropertiesActivity: FC = () => {
  return (
    <div className="container mx-auto md:px-16 lg:px-24">
      <Header />
      <div className="my-4">
        <PropertyCategory
          preloadUI={
            <div className="h-6 w-24 rounded-full mx-3 bg-gray-200 animate-pulse" />
          }
          render={(categories) => (
            <>
              <Link to="/profile/properties" className="w-2/6">
                <Tag
                  tag="Tous"
                  className="bg-brand-bold text-white ml-3 justify-center p-3"
                />
              </Link>
              {categories.map((category) => (
                <Link
                  to={`/profile/properties/${category.title}`}
                  key={`category_${category.categoryId}`}
                  className="w-2/6"
                >
                  <Tag
                    tag={category.title}
                    className="bg-brand-thin hover:bg-brand-bold text-white justify-center p-3"
                  />
                </Link>
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
