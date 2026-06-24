import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { PrivateRoute } from "./components/commons";
import PageNotFound from "./components/commons/PageNotFound";
import QueryProvider from "./components/commons/QueryProvider";
import Posts from "./components/Posts";
import CreatePost from "./components/Posts/CreatePost";
import EditPost from "./components/Posts/EditPost";
import PostsCurrentUser from "./components/Posts/PostsCurrentUser";
import ShowPost from "./components/Posts/Show";
import routes from "./routes";
import useAuthStore from "./stores/authStore";

const AppContent = () => {
  const authToken = useAuthStore(state => state.authToken);
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={PostsCurrentUser} path={routes.posts.myPosts} />
        <Route exact component={EditPost} path="/posts/:slug/edit" />
        <Route exact component={ShowPost} path="/posts/:slug/show" />
        <Route exact component={CreatePost} path={routes.posts.create} />
        <Route exact component={Signup} path={routes.signup} />
        <Route exact component={Login} path={routes.login} />
        <PrivateRoute
          component={Posts}
          condition={isLoggedIn}
          path={routes.dashboard}
          redirectRoute={routes.login}
        />
        <Route component={PageNotFound} />
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
