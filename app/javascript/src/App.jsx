import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { PrivateRoute } from "./components/commons";
import QueryProvider from "./components/commons/QueryProvider";
import Posts from "./components/Posts";
import CreatePost from "./components/Posts/CreatePost";
import ShowPost from "./components/Posts/Show";
import useAuthStore from "./stores/authStore";

const AppContent = () => {
  const authToken = useAuthStore(state => state.authToken);
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={ShowPost} path="/posts/:slug/show" />
        <Route exact component={CreatePost} path="/posts/create" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <PrivateRoute
          component={Posts}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

const App = () => (
  <QueryProvider>
    <AppContent />
  </QueryProvider>
);

export default App;
