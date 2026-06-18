import "../stylesheets/application.scss";
import ReactRailsUJS from "react_ujs";
import App from "../src/App";
import "../../../node_modules/@bigbinary/neetoui/dist/index.css";
import "../../../node_modules/react-toastify/dist/ReactToastify.min.css";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
initializeLogger();
setAuthHeaders();

const componentsContext = { App };
ReactRailsUJS.getConstructor = name => {
  return componentsContext[name];
};
