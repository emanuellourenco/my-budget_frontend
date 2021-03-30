import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Auth from "../views/Auth";
import Transactions from "../views/Transactions";
import Tags from "../views/Tags";

import PrivateRoute from "./PrivateRoute";
import Settings from "../views/Settings";

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Auth} />
      <Route path="/signup" component={Auth} />
      <Route path="/settings" component={Settings} />

      <PrivateRoute path="/" exact component={Dashboard} />
      <PrivateRoute path="/transactions" component={Transactions} />
      <PrivateRoute path="/tags" component={Tags} />
    </Switch>
  );
}

export default Routes;
