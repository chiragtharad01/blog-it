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

const bulk_delete = params =>
  axios.delete("/my_posts/bulk_delete", {
    params: { bulk_params: params },
    paramsSerializer: params =>
      qs.stringify(params, { arrayFormat: "brackets" }),
  });

const bulk_update = params =>
  axios.patch("/my_posts/bulk_update_status", {
    bulk_params: params,
    // paramsSerializer: params =>
    //   qs.stringify(params.ids, { arrayFormat: "brackets" }),
  });
const myPostsApi = { fetch, bulk_delete, bulk_update };

export default myPostsApi;
