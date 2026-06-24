import { useMutation, useQuery, useQueryClient } from "react-query";

import postsApi from "../../apis/posts";
import QUERY_KEYS from "../../constants/queryKeys";
import routes from "../../routes";

export const usePosts = categories =>
  useQuery(
    [QUERY_KEYS.POSTS, categories],
    () => postsApi.fetch({ categories }),
    {
      keepPreviousData: true,
    }
  );

export const usePost = slug =>
  useQuery(
    [QUERY_KEYS.POST, slug],
    () => postsApi.show(slug),
    {
      onError: error => {
        if (error.response?.status === 404) {
          window.location.href = routes.dashboard;
        }
      },
    },
    {
      keepPreviousData: !!slug,
    }
  );

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(payload => postsApi.create(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.POSTS);
      queryClient.invalidateQueries(QUERY_KEYS.MYPOSTS);
    },
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ slug, payload }) => postsApi.update({ slug, payload }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.POST);
        queryClient.invalidateQueries(QUERY_KEYS.POSTS);
        queryClient.invalidateQueries(QUERY_KEYS.MYPOSTS);
      },
    }
  );
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(slug => postsApi.destroy(slug), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.POSTS);
      queryClient.invalidateQueries(QUERY_KEYS.MYPOSTS);
    },
  });
};

export const useUpdatePostStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ slug, status }) => postsApi.updateStatus(slug, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.POST);
        queryClient.invalidateQueries(QUERY_KEYS.POSTS);
        queryClient.invalidateQueries(QUERY_KEYS.MYPOSTS);
      },
    }
  );
};
