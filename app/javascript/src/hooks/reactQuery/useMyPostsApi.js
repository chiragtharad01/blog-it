import { useQuery } from "react-query";

import myPostsApi from "../../apis/myPosts";
import QUERY_KEYS from "../../constants/queryKeys";

export const useMyPosts = () =>
  useQuery([QUERY_KEYS.MYPOSTS], () => myPostsApi.fetch(), {
    keepPreviousData: true,
  });
