import { create } from "zustand";
import { DefaultData } from "../services/Chart.service";
import { DataChart } from "../types/Chart.type";

type DataState = {
  data: DataChart[];
  addData: (node: DataChart) => void;
  // removeData: (node: { test: string }) => void;
};

export const useDataOrgChart = create<DataState>((set) => ({
  data: DefaultData,
  addData: (node) =>
    set((state) => {
      const data = state.data;
      if (data.every((dataNode) => dataNode.id !== node.id)) {
        return { data: [...data, node] };
      }
      return { data: [...data] };
    }),
  // removeData: (node) => set((state) => ({ data: state.data.filter(item => item.id !== node.id) })),
}));
