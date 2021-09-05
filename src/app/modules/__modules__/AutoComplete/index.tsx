import React, {
  createElement,
  Fragment,
  useEffect,
  useRef,
} from 'react';
import { autocomplete } from '@algolia/autocomplete-js';
import { render } from 'react-dom';

export const Autocomplete = (props) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      render({ children }, root) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        render(children, root);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
};
