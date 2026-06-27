import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFilterStore = create(
  persist(
    set => ({
      filters: {
        title: "",
        status: "",
        category_ids: [],
      },

      setFilters: filters =>
        set({
          filters,
        }),

      resetFilters: () =>
        set({
          filters: {
            title: "",
            status: "",
            category_ids: [],
          },
        }),
    }),
    { name: "filterStore" }
  )
);

export default useFilterStore;
