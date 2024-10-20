import { useGetMoviesWinners } from "@api";
import { Table } from "@components";
import type { ITableColumn } from "@types";
import { useMemo, useState } from "react";
import { BaseCard } from "../baseCard/BaseCard";

export const MovieWinnersCard = () => {
  const [year, setYear] = useState("");
  const { data, isLoading, isError } = useGetMoviesWinners(year);

  const columns: ITableColumn[] = useMemo(
    () => [
      { id: "id", label: "Id", sx: { width: "33%" } },
      { id: "year", label: "Year", sx: { width: "33%" } },
      { id: "title", label: "Title", sx: { width: "33%" } },
    ],
    [],
  );

  return (
    <BaseCard>
      <BaseCard.Title label="List movie winners by year" />
      <BaseCard.Input
        size="small"
        type="number"
        variant="filled"
        label="Search by year"
        onSearch={(value) => setYear(value)}
        fullWidth
        isLoading={isLoading}
      />
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
    </BaseCard>
  );
};
