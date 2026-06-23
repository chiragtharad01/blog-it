import { useMutation, useQuery, useQueryClient } from "react-query";

import postsApi from "../../apis/posts";
import QUERY_KEYS from "../../constants/queryKeys";

export const usePosts = categoryIds =>
  useQuery(
    [QUERY_KEYS.POSTS, categoryIds],
    () => postsApi.fetch({ category_ids: categoryIds }),
    {
      keepPreviousData: true,
    }
  );

export const usePost = slug =>
  useQuery([QUERY_KEYS.POST, slug], () => postsApi.show(slug), {
    keepPreviousData: !!slug,
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(payload => postsApi.create(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.POSTS);
    },
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ slug, payload }) => postsApi.update({ slug, payload }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.POST, QUERY_KEYS.POSTS);
      },
    }
  );
};
