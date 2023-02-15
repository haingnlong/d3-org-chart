import { create } from "zustand";
import { DefaultData } from "../services/Chart.service";
import { DataChart } from "../types/Chart.type";

type DataState = {
  data: DataChart[];
  addData: (node: DataChart) => void;
  dataNode: DataChart;
  getDataNode: (id: string) => void;
  updateDataNode: (node: DataChart) => void;
  removeData: (id: string) => void;
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
  dataNode: {},
  getDataNode: (id) =>
    set((state) => {
      const data = state.data;
      return { dataNode: data.find((dataNode) => dataNode.id === id) };
    }),
  updateDataNode: (node) =>
    set((state) => {
      const data = [...state.data];
      data.forEach((e) => {
        if (e.id === node.id) {
          e.fte = node.fte;
          e.ftePosition = node.ftePosition;
          e.name = node.name;
        }
      });
      return { data: data };
    }),
  removeData: (id) =>
    set((state) => {
      state.data = state.data.filter((dataNode) => dataNode.id !== id);
      return { data: state.data };
    }),
}));
