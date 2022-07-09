import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/AuthenticationFlow/Login";

// Dashboard
// import Dashboard from '../pages/Dashboard/index';
//constants
import { constants as PATH } from "../Constant/ComponentPath";
import Home from "../pages/Section/Home";

const authProtectedRoutes = [
  // { path: PATH.DASHBOARD, component: Dashboard },
  { path: PATH.HOME, component: Home },
  { path: PATH.ABOUT, component: Home },
  { path: PATH.FEATURES, component: Home },
  { path: PATH.MEDIA_PARTNER, component: Home },
  { path: PATH.INVESTOR, component: Home },
  { path: PATH.TOKENOMICS, component: Home },
  { path: PATH.ROADMAP, component: Home },
  { path: PATH.TEAM, component: Home },
  // this route should be at the end of all other routes
  {
    path: "/admin/home",
    exact: true,
    component: () => <Redirect to={PATH.HOME} />,
  },
];

const publicRoutes = [{ path: PATH.LOGIN, component: Login }];

export { authProtectedRoutes, publicRoutes };
