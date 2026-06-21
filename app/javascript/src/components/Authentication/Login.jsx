import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/Login";
import Logger from "js-logger";
import { setToLocalStorage } from "utils/storage";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.login(values);
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: values.email.toLowerCase(),
        userId: response.data.id,
        userName: response.data.name,
      });
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
