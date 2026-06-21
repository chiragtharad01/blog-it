const { default: axios } = require("axios");

const fetch = () => axios.get("/users");

const show = id => axios.get(`/users/${id}`);

const usersApi = { fetch, show };

export default usersApi;
