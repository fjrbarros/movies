import { GET_MULTIPLE_WINNERS_KEY } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { ApiService, type TParams } from "../../base";

interface YearData {
  year: number;
  winnerCount: number;
}

interface IResponseMultipleWinners {
  years: YearData[];
}

export const useGetMultipleWinners = () => {
  const apiService = new ApiService();
  const params: TParams = { projection: "years-with-multiple-winners" };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<IResponseMultipleWinners[], Error>({
    queryKey: [GET_MULTIPLE_WINNERS_KEY],
    queryFn: () => {
      return apiService.get<IResponseMultipleWinners[]>({ params });
    },
  });

  return { data, isLoading, isError };
};
