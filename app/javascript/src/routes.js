const routes = {
  root: "/",
  login: "/login",
  signup: "/signup",
  dashboard: "/dashboard",
  posts: {
    create: "/posts/create",
    myPosts: "/posts/myposts",

    show: slug => `/posts/${slug}/show`,
    edit: slug => `/posts/${slug}/edit`,
  },
};

export default routes;
