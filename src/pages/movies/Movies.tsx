import { useGetListMovies } from "@api";
import { PageWrapper, Table } from "@components";
import { DEFAULT_PAGE_SIZE, FIRST_PAGE, moviesPageName } from "@constants";
import { Typography } from "@mui/material";
import type { ITableColumn } from "@types";
import { useCallback, useMemo, useState } from "react";

interface IFilter {
  year: string;
  winner: string;
}

export const Movies = () => {
  const [filters, setFilters] = useState<IFilter>({ year: "", winner: "" });
  const [pagination, setPagination] = useState({
    page: FIRST_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });

  const { data, isLoading, isError } = useGetListMovies({
    ...filters,
    page: Math.max(pagination.page - 1, 0),
    size: pagination.size,
  });
  const showPagination = !isLoading && !isError && data?.content.length > 0;

  const columns: ITableColumn[] = useMemo(() => {
    const commonColumnProps: Partial<ITableColumn> = {
      headerTextAlign: "center",
      sx: {
        width: "25%",
        minWidth: "180px",
        borderRight: "1px solid #e0e0e0",
        borderLeft: "1px solid #e0e0e0",
      },
    };

    return [
      {
        id: "id",
        label: "Id",
        ...commonColumnProps,
      },
      {
        id: "year",
        label: "Year",
        ...commonColumnProps,
        sx: { ...commonColumnProps.sx, minWidth: "200px" },
        filter: {
          type: "number",
          placeholder: "Filter by year",
          triggerOnEnter: true,
        },
      },
      {
        id: "title",
        label: "Title",
        ...commonColumnProps,
      },
      {
        id: "winner",
        label: "Winner",
        filter: {
          type: "select",
          placeholder: "Yes/No",
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
        },
        ...commonColumnProps,
      },
    ];
  }, []);

  const handleFilterChange = useCallback((value: IFilter) => {
    setPagination((prev) => ({ ...prev, page: FIRST_PAGE }));
    setFilters((prev) => ({ ...prev, ...value }));
  }, []);

  const handlePageChange = useCallback((page: number, size: number) => {
    setPagination((prev) => ({ ...prev, page, size }));
  }, []);

  return (
    <PageWrapper pageTitle={moviesPageName}>
      <Typography variant="h4" marginBottom="15px">
        List movies
      </Typography>
      <Table
        data={data.content}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        onFilterChange={(value) =>
          handleFilterChange(value as unknown as IFilter)
        }
        showPagination={showPagination}
        page={pagination.page}
        pageSize={pagination.size}
        count={data?.totalPages ?? 0}
        onPageChange={handlePageChange}
      />
    </PageWrapper>
  );
};
