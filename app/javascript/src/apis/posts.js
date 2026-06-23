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

const postsApi = { fetch, create, show, update, destroy, updateStatus };

export default postsApi;
