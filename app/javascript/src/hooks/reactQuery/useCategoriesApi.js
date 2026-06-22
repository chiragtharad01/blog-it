import { useMutation, useQuery, useQueryClient } from "react-query";

import categoriesApi from "../../apis/categories";
import QUERY_KEYS from "../../constants/queryKeys";

export const useCategories = search =>
  useQuery([QUERY_KEYS.CATEGORIES, search], () =>
    categoriesApi.fetch({ search })
  );

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(payload => categoriesApi.create(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.CATEGORIES);
    },
  });
};
