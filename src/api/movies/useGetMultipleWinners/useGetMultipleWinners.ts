import { GET_MULTIPLE_WINNERS_KEY } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../base";

interface YearData {
  year: number;
  winnerCount: number;
}

interface IResponseMultipleWinners {
  years: YearData[];
}

export const useGetMultipleWinners = () => {
  const service = new ApiService();
  const params = { projection: "years-with-multiple-winners" };

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<IResponseMultipleWinners, Error>({
    queryKey: [GET_MULTIPLE_WINNERS_KEY],
    queryFn: async () => {
      return await service.get<IResponseMultipleWinners>({ params });
    },
  });

  const data = response?.years ?? [];

  return { data, isLoading, isError };
};
