import { useQuery } from "react-query";

import QUERY_KEYS from "./queryKeys";

import usersApi from "../apis/users";

export const useUsers = () => useQuery(QUERY_KEYS.USERS, usersApi.fetch);

export const useUser = id =>
  useQuery([QUERY_KEYS.USER, id], () => usersApi.show(id), {
    enabled: !!id,
  });
