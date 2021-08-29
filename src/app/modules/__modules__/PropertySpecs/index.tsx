import React, { FC } from 'react';
import Tag from 'app/modules/__modules__/Tag';
import { IObject } from 'app/modules/@Types';
import BathroomVector from '../_vectors/bathroomVector';
import BedroomVector from '../_vectors/bedroomVector';

interface Props {
  specs: IObject;
  loading: boolean;
  className?: string;
  tagClassName?: string;
}

const defaultProps: Partial<Props> = {
  className: 'my-2 sm:px-4',
  tagClassName: 'bg-brand-bold text-white my-1',
};

const PropertySpecs: FC<Props> = ({
  specs,
  loading,
  className,
  tagClassName,
}: Props) => {
  if (loading) {
    return (
      <div className="flex flex-wrap content-center ml-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Tag
            key={`preloading_specs_${index.toFixed()}`}
            condition={!loading}
            tag={<div />}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex content-center ${className}`}>
      {specs &&
        typeof specs === 'object' &&
        Object.keys(specs)
          .filter((spec) => spec === 'bathroom' || spec === 'bedroom')
          .map((spec, index) => {
            if (!specs[spec]) {
              return null;
            }
            return (
              <Tag
                key={`property_spec_${index.toFixed()}`}
                condition={!loading || !!specs[spec]}
                tag={`${specs[spec]} ${spec}`}
                className={tagClassName}
                icon={
                  (spec === 'bathroom' && <BathroomVector />) || (
                    <BedroomVector />
                  )
                }
              />
            );
          })}
    </div>
  );
};

PropertySpecs.defaultProps = defaultProps;

export default PropertySpecs;
