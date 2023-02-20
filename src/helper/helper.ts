import { DataChart } from '../types/Chart.type';

let totalChild: string[] = [];
export const getAllChildById = (
  values: DataChart[],
  ids: string[]
): string[] => {
  const child: string[] = [];
  for (let i = 0; i < values.length; i++) {
    let parentId = values[i].parentId || '';
    if (ids.includes(parentId)) {
      child.push(values[i].id);
    }
  }
  totalChild = [...totalChild, ...child];
  if (child.length > 0) {
    getAllChildById(values, child);
  }
  return totalChild;
};
