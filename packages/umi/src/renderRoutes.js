import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default function renderRoutes(
  routes,
  extraProps = {},
  switchProps = {},
) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        const RouteComponent = route.Route || Route;
        return (
          <RouteComponent
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={props => {
              console.log('test', route.path);
              return (
                <route.component {...props} {...extraProps} route={route}>
                  {renderRoutes(
                    route.routes,
                    {},
                    {
                      location: props.location,
                    },
                  )}
                </route.component>
              );
            }}
          />
        );
      })}
    </Switch>
  ) : null;
}
