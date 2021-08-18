import React from 'react';
import Tag from 'app/modules/__modules__/Tag';

interface Props {
  specs: { [key: string]: number | string | null | undefined };
  loading: boolean;
}

const PropertySpecs = ({ specs, loading }: Props) => {
  return (
    <div className="flex flex-wrap content-center my-2 sm:px-4">
      {Object.keys(specs).map((spec, index) => {
        if (!specs[spec]) {
          return null;
        }
        return (
          <Tag
            key={`property_spec_${index.toFixed()}`}
            condition={!loading || !!specs[spec]}
            tag={`${specs[spec]} ${spec}`}
            className="bg-brand-bold text-white my-1"
          />
        );
      })}
    </div>
  );
};

export default PropertySpecs;
