import React, { lazy, Component } from "react";
import { Route, Routes } from "react-router-dom";

export const NamedRoute = {
  home: "/",
  search: "/search",
};

const home = lazy(() => import("../pages/Home"));
const search = lazy(() => import("../pages/Search/index"));

class AppRoutes extends Component {
  render() {
    return (
      <React.Suspense fallback={<></>}>
        <Routes>
          <Route path={NamedRoute.home} Component={home} />
          <Route path={NamedRoute.search} Component={search} />
        </Routes>
      </React.Suspense>
    );
  }
}

export default AppRoutes;
