import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import isExpired from '../modules/utils/helpers/isExpired';

type RouteType = {
  exact: boolean;
  path: string;
  secured: boolean;
  title: string;
  Component: React.ElementType;
};

interface RoutesProps {
  location?: Record<string, never>;
  history?: Record<string, never>;
  match?: Record<string, never>;
  routes: RouteType[];
}

const Routes: React.FC<RoutesProps> = ({ routes }) => {
  const expired = isExpired();

  const render = (route: RouteType | never) => (
    <Route
      key={`route_${routes.indexOf(route)}`}
      exact={route.exact}
      path={route.path}
      render={(props: any) => {
        if (route.secured && expired) {
          return <Redirect to="/" />;
        }

        if (route.title) {
          document.title = route.title;
        }

        return (
          <route.Component
            location={props.location}
            history={props.history}
            match={props.match}
          />
        );
      }}
    />
  );
  return (
    <Switch>{routes.map((route: RouteType) => render(route))}</Switch>
  );
};

export default Routes;
