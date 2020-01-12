import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "./service/history";
import Home from "./features/Home";
import NotFound from "./features/NotFound";
import Statistics from "./features/Statistics";
import { routes } from "./constants";

const App = () => {
  const { homeRoute, statisticsRoute, aboutUsRoute } = routes;

  return (
    <Router history={history}>
      <Switch>
        <Route path={homeRoute} exact component={Home} />
        <Route path={statisticsRoute} exact component={Statistics} />
        <Route path={aboutUsRoute} exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
