import { create } from 'zustand';
import { DefaultData } from '../services/Chart.service';
import { DataChart } from '../types/Chart.type';
import { OrgChart } from 'd3-org-chart';
import { getAllChildById } from '../helper/helper';

type DataState = {
  chart: OrgChart<DataChart>;
  data: DataChart[];
  addData: (node: DataChart) => void;
  dataNode: DataChart;
  setDataNode: (id: string) => void;
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
  chart: new OrgChart(),
  data: DefaultData,
  addData: (node) =>
    set((state) => {
      const data = state.data;
      if (data.every((dataNode) => dataNode.id !== node.id)) {
        return { data: [...data, node] };
      }
      return { data: [...data] };
    }),
  dataNode: { id: '', parentId: '' },
  setDataNode: (id) =>
    set((state) => {
      const data = state.data;
      return { dataNode: data.find((dataNode) => dataNode.id === id) };
    }),
  isOpenAddModal: false,
  setIsOpenAddModal: (isOpen) =>
    set(() => {
      return { isOpenAddModal: isOpen };
    }),
  isOpenAddNodeModal: false,
  setIsOpenAddNodeModal: (isOpen) =>
    set(() => {
      return { isOpenAddNodeModal: isOpen };
    }),
  isOpenUpdateModal: false,
  setIsOpenUpdateModal: (isOpen) =>
    set(() => {
      return { isOpenUpdateModal: isOpen };
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
      const child = getAllChildById(state.data, [id]);
      const nodes = [id, ...child];
      const newData = state.data.filter((item) => {
        return !nodes.includes(item.id);
      });
      return { data: newData };
    }),
}));
