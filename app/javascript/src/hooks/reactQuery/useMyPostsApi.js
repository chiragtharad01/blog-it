import { useMutation, useQuery, useQueryClient } from "react-query";

import myPostsApi from "../../apis/myPosts";
import QUERY_KEYS from "../../constants/queryKeys";

export const useMyPosts = filters =>
  useQuery([QUERY_KEYS.MYPOSTS, filters], () => myPostsApi.fetch(filters), {
    keepPreviousData: true,
  });

export const useBulkUpdateMyPosts = () => {
  const queryClient = useQueryClient();

  return useMutation(params => myPostsApi.bulk_update(params), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.POST);
      queryClient.invalidateQueries(QUERY_KEYS.POSTS);
      queryClient.invalidateQueries(QUERY_KEYS.MYPOSTS);
    },
  });
};

export const useBulkDeleteMyPosts = () => {
  const queryClient = useQueryClient();

  return useMutation(params => myPostsApi.bulk_delete(params), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.POST);
      queryClient.invalidateQueries(QUERY_KEYS.POSTS);
      queryClient.invalidateQueries(QUERY_KEYS.MYPOSTS);
    },
  });
};
