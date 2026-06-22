import React from "react";

import Logger from "js-logger";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import SignupForm from "./Form/Signup";

import { useSignup } from "../../hooks/reactQuery/useAuthApi";

const Signup = () => {
  const history = useHistory();
  const signupMutation = useSignup();
  const handleSubmit = async values => {
    try {
      await signupMutation.mutateAsync(values);
      history.push("/dashboard");
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <SignupForm
        disabled={signupMutation.isLoading}
        handleSubmit={handleSubmit}
        loading={signupMutation.isLoading}
      />
    </div>
  );
};

export default Signup;
