import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_COLUMNS = {
  title: true,
  category: true,
  lastPublishedAt: true,
  status: true,
};

const usePostTableStore = create(
  persist(
    set => ({
      visibleColumns: DEFAULT_COLUMNS,

      toggleColumn: column =>
        set(state => ({
          visibleColumns: {
            ...state.visibleColumns,
            [column]: !state.visibleColumns[column],
          },
        })),
    }),
    {
      name: "postTableColumn",
    }
  )
);

export default usePostTableStore;
