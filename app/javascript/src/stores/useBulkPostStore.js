import { create } from "zustand";

const useBulkPostStore = create(set => ({
  selectedRowKeys: [],
  setSelectedRowKeys: selectedRowKeys => set({ selectedRowKeys }),

  clearSelection: () => set({ selectedRowKeys: [] }),
}));

export default useBulkPostStore;
