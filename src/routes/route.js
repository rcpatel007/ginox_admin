import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { STORAGEKEY } from '../Constant/index';
import { constants as PATH } from '../Constant/ComponentPath';

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthProtected && !localStorage.getItem(STORAGEKEY.ACCESSTOKEN)) {
        return (
          <Redirect
            to={{ pathname: PATH.LOGIN, state: { from: props.location } }}
          />
        );
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default AppRoute;
