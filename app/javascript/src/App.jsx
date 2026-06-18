import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Posts from "./components/Posts";
import CreatePost from "./components/Posts/CreatePost";
import ShowPost from "./components/Posts/Show";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={ShowPost} path="/posts/:slug/show" />
      <Route exact component={CreatePost} path="/posts/create" />
      <Route exact component={Posts} path="/dashboard" />
    </Switch>
  </Router>
);

export default App;
