import React from "react";

import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/Login";
import Logger from "js-logger";

import { useLogin } from "../../hooks/reactQuery/useAuthApi";
import useAuthStore from "../../stores/authStore";

const Login = () => {
  const login = useAuthStore(state => state.login);
  const loginMutation = useLogin();
  const handleSubmit = async values => {
    event.preventDefault();
    try {
      const response = await loginMutation.mutateAsync(values);
      const loginData = {
        authToken: response.data.authentication_token,
        authEmail: values.email.toLowerCase(),
        authUserId: response.data.id,
        authUserName: response.data.name,
      };
      login(loginData);
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm
        disabled={loginMutation.isLoading}
        handleSubmit={handleSubmit}
        loading={loginMutation.isLoading}
      />
      ;
    </div>
  );
};

export default Login;
