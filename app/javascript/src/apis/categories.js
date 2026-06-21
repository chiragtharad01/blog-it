import axios from "axios";

const fetch = params => axios.get("/categories", { params });

const create = payload => axios.post("/categories", { category: payload });

const categoriesApi = { fetch, create };

export default categoriesApi;
