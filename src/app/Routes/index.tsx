import React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import IRoute from 'app/modules/@Types/route.interface';
import { isAgent } from 'app/modules/utils/helpers/currentUser';
import NotFoundPage from 'app/modules/_noAuth/NotFoundPage';
import isExpired from '../modules/utils/helpers/isExpired';

interface IProps {
  routes: IRoute[];
}

const Routes: React.FC<IProps> = ({ routes }) => {
  const render = (route: IRoute) => (
    <Route
      key={`route_${routes.indexOf(route)}`}
      exact={route.exact}
      path={route.path}
      render={(props: RouteComponentProps) => {
        if (route.isRestricted && !isAgent()) return <NotFoundPage />;

        if (route.secured && isExpired())
          return <Redirect to="/" exact />;

        if (route.name) {
          document.title = route.name;
        }

        return <route.component {...props} />;
      }}
    />
  );
  return <Switch>{routes.map((route) => render(route))}</Switch>;
};

export default Routes;
