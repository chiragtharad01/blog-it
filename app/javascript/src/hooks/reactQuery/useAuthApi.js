import { useMutation } from "react-query";

import authApi from "../../apis/auth";

export const useLogin = () => useMutation(payload => authApi.login(payload));

export const useSignup = () => useMutation(payload => authApi.signup(payload));

export const useLogout = () => useMutation(() => authApi.logout());
