import { useGetListMovies } from "@api";
import { PageWrapper, Table } from "@components";
import { moviesPageName } from "@constants";
import { Typography } from "@mui/material";
import type { ITableColumn } from "@types";
import { useCallback, useMemo, useState } from "react";

interface IFilter {
  year: string;
  winner: string;
}

export const Movies = () => {
  const [filters, setFilters] = useState<IFilter>({ year: "", winner: "" });

  const { data, isLoading } = useGetListMovies({
    page: 0,
    size: 999,
    ...filters,
  });

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
        filter: {
          type: "number",
          placeholder: "Filter by year",
          triggerOnEnter: true,
        },
        ...commonColumnProps,
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
    setFilters((prev) => ({ ...prev, ...value }));
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
        onFilterChange={(value) =>
          handleFilterChange(value as unknown as IFilter)
        }
      />
    </PageWrapper>
  );
};
