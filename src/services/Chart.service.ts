import { DataChart, ResponseAPI } from "../types/Chart.type";

export const DefaultData: DataChart[] = [
  {
    id: "tct",
    name: "Tổng công ty",
  },
  {
    id: "hotro",
    name: "Khối hỗ trợ",
    parentId: "tct",
    fte: 10,
    ftePosition: 100,
  },
  {
    id: "dieuhanh",
    name: "Ban điều hành",
    parentId: "hotro",
    fte: 20,
    ftePosition: 200,
  },
  {
    id: "phapche",
    name: "Ban pháp chế",
    parentId: "hotro",
    fte: 30,
    ftePosition: 300,
  },
  {
    id: "ttnnlc",
    name: "Trung tâm nguồn nhân lực cao",
    parentId: "hotro",
    fte: 30,
    ftePosition: 300,
  },
  {
    id: "marketing",
    name: "Ban Marketing",
    parentId: "hotro",
    fte: 30,
    ftePosition: 300,
  },
  {
    id: "kythuat",
    name: "Khối kỹ thuật",
    parentId: "tct",
    fte: 50,
    ftePosition: 500,
  },
  {
    id: "test1",
    name: "Test1",
    parentId: "ttnnlc",
    fte: 30,
    ftePosition: 300,
  },
  {
    id: "test2",
    name: "Test2",
    parentId: "ttnnlc",
    fte: 30,
    ftePosition: 300,
  },
  {
    id: "test3",
    name: "Test3",
    parentId: "marketing",
    fte: 30,
    ftePosition: 300,
  },
  {
    id: "Test4",
    name: "Test4",
    parentId: "marketing",
    fte: 30,
    ftePosition: 300,
  },
];

export const addData = (params: any) => {
  return DefaultData.push(params);
};

export const ChartData = {
  getData: (): Promise<ResponseAPI<DataChart[]>> => {
    return Promise.resolve({
      data: DefaultData,
    });
  },

  addData: (params: DataChart) => {
    return Promise.resolve(DefaultData.push(params));
  },
};
