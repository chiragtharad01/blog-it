import "../stylesheets/application.scss";
import ReactRailsUJS from "react_ujs";
import "../src/common/i18n";
import App from "../src/App";
import "../../../node_modules/@bigbinary/neetoui/dist/index.css";
import "../../../node_modules/react-toastify/dist/ReactToastify.min.css";

import { initializeLogger } from "common/logger";
import { registerIntercepts, setAuthHeaders } from "../src/apis/axios";
// import { registerIntercepts, setAuthHeaders } from "../src/apis/axios";
registerIntercepts();
initializeLogger();
setAuthHeaders();

const componentsContext = { App };
ReactRailsUJS.getConstructor = name => {
  return componentsContext[name];
};
