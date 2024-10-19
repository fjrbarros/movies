import { GET_MOVIES_WINNERS_KEY } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../base";

interface IResponseMoviesWinners {
  id: number;
  year: number;
  title: string;
}

export const useGetMoviesWinners = (year: string) => {
  const service = new ApiService();
  const params = { winner: "true", year: year.toString() };

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<IResponseMoviesWinners[], Error>({
    queryKey: [GET_MOVIES_WINNERS_KEY, params],
    queryFn: () => service.get<IResponseMoviesWinners[]>({ params }),
    enabled: !!year,
  });

  const data = response ?? [];

  return { data, isLoading, isError };
};
