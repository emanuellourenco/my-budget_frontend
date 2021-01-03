import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";
import Transactions from "../views/Transactions";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/transactions" component={Transactions} />
    </Switch>
  );
}

export default Routes;
