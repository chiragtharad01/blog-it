// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.

import { createConsumer } from "@rails/actioncable";

import useAuthStore from "../stores/useAuthStore";

const buildWebsocketURL = () => {
  const { authToken, authEmail } = useAuthStore.getState();

  return encodeURI(`/cable?auth_token=${authToken}&email=${authEmail}`);
};

export default () => createConsumer(buildWebsocketURL());
