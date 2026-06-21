import React, { useState } from "react";

import Logger from "js-logger";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import SignupForm from "./Form/Signup";

import authApi from "../../apis/auth";

const Signup = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async values => {
    setLoading(true);
    try {
      // console.log(values);
      await authApi.signup(values);
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <SignupForm handleSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default Signup;
