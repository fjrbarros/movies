import { GET_MOVIES_WINNERS_KEY } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../base";

interface IUseGetListMoviesParams {
  year: string;
  winner: string;
  page: number;
  size: number;
}

interface IProducer {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

interface ISort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

interface IPageable {
  sort: ISort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

interface IResponseListMovies {
  content: IProducer[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: ISort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export const useGetListMovies = (props: IUseGetListMoviesParams) => {
  const service = new ApiService();
  const { year, winner, page, size } = props;
  const params = {
    year: year.toString(),
    winner: winner.toString(),
    page: page.toString(),
    size: size.toString(),
  };

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<IResponseListMovies, Error>({
    queryKey: [GET_MOVIES_WINNERS_KEY, props],
    queryFn: () => service.get<IResponseListMovies>({ params }),
  });

  const data = {
    ...response,
    content: normalizeData(response?.content || []),
  };

  return { data, isLoading, isError };
};

const normalizeData = (data: IProducer[]) => {
  return data.map((item) => ({
    ...item,
    winner: item.winner ? "Yes" : "No",
  }));
};
