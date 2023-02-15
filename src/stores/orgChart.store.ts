import { create } from "zustand";
import { DefaultData } from "../services/Chart.service";
import { DataChart } from "../types/Chart.type";

type DataState = {
  data: DataChart[];
  addData: (node: DataChart) => void;
  dataNode: DataChart;
  getDataNode: (id: string) => void;
  isOpenAddModal: boolean;
  setIsOpenAddModal: (isOpen: boolean) => void;
  isOpenAddNodeModal: boolean;
  setIsOpenAddNodeModal: (isOpen: boolean) => void;
  isOpenUpdateModal: boolean;
  setIsOpenUpdateModal: (isOpen: boolean) => void;
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
    isOpenAddModal: false,
    setIsOpenAddModal: (isOpen) => set(() => {
        return { isOpenAddModal: isOpen }
    }),
    isOpenAddNodeModal: false,
    setIsOpenAddNodeModal: (isOpen) => set(() => {
        return { isOpenAddNodeModal: isOpen }
    }),
    isOpenUpdateModal: false,
    setIsOpenUpdateModal: (isOpen) => set(() => {
        return { isOpenUpdateModal: isOpen }
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
