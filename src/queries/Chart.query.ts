import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";
import { ChartData } from "../services/Chart.service";
import { DataChart } from "../types/Chart.type";

const CHART_CACHE_KEY = {
  get_data: "get_data",
  add_data: "add_data",
};

export const useGetData = () => {
  return useQuery([CHART_CACHE_KEY.get_data], () => {
    return ChartData.getData();
  });
};

export const useAddData = () => {
  return useMutation(
    [CHART_CACHE_KEY.add_data],
    (params: DataChart) => {
      return ChartData.addData(params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([CHART_CACHE_KEY.get_data]);
      },
    }
  );
};
