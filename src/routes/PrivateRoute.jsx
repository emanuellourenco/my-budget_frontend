import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute(props) {
  const { component, path, exact } = props;
  const token = localStorage.getItem("token");

  return !!token ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to="/login" />
  );
}

export default PrivateRoute;
