export type DataChart = {
  id?: string;
  parentId?: string;
  name?: string;
  fte?: number;
  ftePosition?: number;
};

export type ResponseAPI<T> = {
  data?: T;
  error?: string;
};
