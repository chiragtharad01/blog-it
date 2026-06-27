import { useQuery } from "react-query";

import myPostsApi from "../../apis/myPosts";
import QUERY_KEYS from "../../constants/queryKeys";

export const useMyPosts = filters =>
  useQuery([QUERY_KEYS.MYPOSTS, filters], () => myPostsApi.fetch(filters), {
    keepPreviousData: true,
  });
