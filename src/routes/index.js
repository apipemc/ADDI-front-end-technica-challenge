import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from './config';

const RouteWithSubRoutes = props => {
  const { component: Component, exact, path, routes, ...rest } = props;
  if (routes) {
    return (
      <Route
        exact={exact}
        path={path}
        render={componentProps => (
          <Component {...componentProps} {...rest}>
            <Switch>
              {routes.map(route => (
                <RouteWithSubRoutes key={route.path} {...route} />
              ))}
            </Switch>
          </Component>
        )}
      />
    );
  }
  return <Route component={Component} exact={exact} path={path} {...rest} />;
};

RouteWithSubRoutes.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({})),
};

RouteWithSubRoutes.defaultProps = {
  component: null,
  exact: false,
  routes: null,
};

const RouteConfig = () => (
  <Switch>
    {config.map(route => (
      <RouteWithSubRoutes key={route.path} {...route} />
    ))}
  </Switch>
);

export default RouteConfig;
