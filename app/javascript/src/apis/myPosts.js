import axios from "axios";
import qs from "qs";

const fetch = filters => {
  const payload = {
    ...filters,
    status: filters.status?.value,
    category_ids: filters.category_ids?.map(category => category.value),
  };

  return axios.get("/my_posts", {
    params: { my_posts: payload },
    paramsSerializer: params =>
      qs.stringify(params, { arrayFormat: "brackets" }),
  });
};

const myPostsApi = { fetch };

export default myPostsApi;
