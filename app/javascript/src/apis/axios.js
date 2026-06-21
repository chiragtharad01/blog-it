import { Toastr } from "@bigbinary/neetoui";
import axios from "axios";

import useAuthStore from "../stores/authStore";

axios.defaults.baseURL = "/";

const DEFAULT_ERROR_NOTIFICATION = "Something went wrong!";

const setAuthHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const { authToken, authEmail } = useAuthStore.getState();
  if (authToken && authEmail) {
    axios.defaults.headers["X-Auth-Email"] = authEmail;
    axios.defaults.headers["X-Auth-Token"] = authToken;
  }
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  if (axiosErrorObject.response?.status === 401) {
    useAuthStore.getState().logout();
    setTimeout(() => (window.location.href = "/"), 2000);
  }

  Toastr.error(
    axiosErrorObject.response?.data?.error || DEFAULT_ERROR_NOTIFICATION
  );
  if (axiosErrorObject.response?.status === 423) {
    window.location.href = "/";
  }

  return Promise.reject(axiosErrorObject);
};

const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, error =>
    handleErrorResponse(error)
  );
};

const resetAuthTokens = () => {
  delete axios.defaults.headers["X-Auth-Email"];
  delete axios.defaults.headers["X-Auth-Token"];
};
export { setAuthHeaders, registerIntercepts, resetAuthTokens };
