import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/Login";
import Logger from "js-logger";

import useAuthStore from "../../stores/authStore";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const login = useAuthStore(state => state.login);
  const handleSubmit = async values => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.login(values);
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
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm handleSubmit={handleSubmit} loading={loading} />;
    </div>
  );
};

export default Login;
