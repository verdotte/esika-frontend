import React, { FC } from 'react';
import Tag from 'app/modules/__modules__/Tag';
import { IObject } from 'app/modules/@Types';

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
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <Tag
            key={`preloading_specs_${index.toFixed()}`}
            condition={!loading}
            tag={<div />}
          />
        ))}
      </>
    );
  }

  return (
    <div className={`flex flex-wrap content-center ${className}`}>
      {Object.keys(specs).map((spec, index) => {
        if (!specs[spec]) {
          return null;
        }
        return (
          <Tag
            key={`property_spec_${index.toFixed()}`}
            condition={!loading || !!specs[spec]}
            tag={`${specs[spec]} ${spec}`}
            className={tagClassName}
          />
        );
      })}
    </div>
  );
};

PropertySpecs.defaultProps = defaultProps;

export default PropertySpecs;
