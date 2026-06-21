import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    set => ({
      authToken: null,
      authEmail: null,
      authUserId: null,
      authUserName: null,
      login: ({ authToken, authEmail, authUserId, authUserName }) =>
        set({
          authToken,
          authEmail,
          authUserId,
          authUserName,
        }),

      logout: () =>
        set({
          authToken: null,
          authEmail: null,
          authUserId: null,
          authUserName: null,
        }),
    }),
    {
      name: "auth_storage",
    }
  )
);

export default useAuthStore;
