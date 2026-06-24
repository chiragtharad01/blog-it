import axios from "axios";

const fetch = () => axios.get("/my_posts");

const myPostsApi = { fetch };

export default myPostsApi;
