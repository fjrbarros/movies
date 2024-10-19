import { useGetMultipleWinners } from "@api";
import { Table } from "@components";
import type { ITableColumn } from "@types";
import { useMemo } from "react";
import { BaseCard } from "../baseCard/BaseCard";

export const MultipleWinnersCard = () => {
  const { data, isLoading } = useGetMultipleWinners();

  const columns: ITableColumn[] = useMemo(
    () => [
      { id: "year", label: "Year", sx: { width: "50%" } },
      { id: "winnerCount", label: "Win count", sx: { width: "50%" } },
    ],
    [],
  );

  return (
    <BaseCard>
      <BaseCard.Title label="List years with multiple winners" />
      <Table columns={columns} data={data} isLoading={isLoading} />
    </BaseCard>
  );
};
