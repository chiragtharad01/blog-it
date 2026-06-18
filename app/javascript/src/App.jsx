import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Posts from "./components/Posts";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <div>Home</div>} />
      <Route exact path="/about" render={() => <div>About</div>} />
      <Route exact component={Posts} path="/dashboard" />
    </Switch>
  </Router>
);

export default App;
