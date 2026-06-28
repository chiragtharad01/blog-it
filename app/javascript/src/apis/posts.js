import axios from "axios";

const fetch = params => axios.get("/posts", { params });

const create = payload => axios.post("/posts", { post: payload });

const show = slug => axios.get(`posts/${slug}`);

const update = ({ slug, payload }) =>
  axios.put(`/posts/${slug}`, { post: payload });

const destroy = slug => axios.delete(`/posts/${slug}`);
const updateStatus = (slug, status) =>
  axios.patch(`/posts/${slug}`, {
    post: { status },
    quite: true,
  });

const upvote = slug => axios.patch(`/posts/${slug}/upvote`);
const downvote = slug => axios.patch(`/posts/${slug}/downvote`);

const postsApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  updateStatus,
  upvote,
  downvote,
};

export default postsApi;
