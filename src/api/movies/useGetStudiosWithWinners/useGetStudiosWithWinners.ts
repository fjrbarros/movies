import { GET_STUDIOS_WITH_WINNERS_KEY } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../base";

interface IStudio {
  name: string;
  winCount: number;
}

interface IResponseStudiosWithWinners {
  studios: IStudio[];
}

export const useGetStudiosWithWinners = () => {
  const service = new ApiService();
  const params = { projection: "studios-with-win-count" };

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<IResponseStudiosWithWinners, Error>({
    queryKey: [GET_STUDIOS_WITH_WINNERS_KEY],
    queryFn: () => service.get<IResponseStudiosWithWinners>({ params }),
  });

  const data = response?.studios ?? [];

  return { data, isLoading, isError };
};
