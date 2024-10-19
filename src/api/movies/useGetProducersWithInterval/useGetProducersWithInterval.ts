import { GET_WINNERS_BY_INTERVAL_KEY } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../base";

interface IProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

interface IResponseProducersWithInterval {
  min: IProducerInterval[];
  max: IProducerInterval[];
}

export const useGetProducersWithInterval = () => {
  const service = new ApiService();
  const params = { projection: "max-min-win-interval-for-producers" };

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<IResponseProducersWithInterval, Error>({
    queryKey: [GET_WINNERS_BY_INTERVAL_KEY],
    queryFn: () => service.get<IResponseProducersWithInterval>({ params }),
  });

  const data = { max: response?.max ?? [], min: response?.min ?? [] };

  return { data, isLoading, isError };
};
