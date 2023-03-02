import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainApp from "./MainApp";
import MovieDetails from "./MovieDetails";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainApp} />
          <Route exact path="/:id" component={MovieDetails} />
          <Route path="*" exact={true} component={MainApp} />
        </Switch>
      </Router>
    </>
  );
}
