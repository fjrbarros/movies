import { useGetStudiosWithWinners } from "@api";
import { Table } from "@components";
import type { ITableColumn } from "@types";
import { useMemo } from "react";
import { BaseCard } from "../baseCard/BaseCard";

export const StudiosCard = () => {
  const { data, isLoading } = useGetStudiosWithWinners();
  const top3Studios = data.slice(0, 3);

  const columns: ITableColumn[] = useMemo(
    () => [
      { id: "name", label: "Name", sx: { width: "50%" } },
      { id: "winCount", label: "Win count", sx: { width: "50%" } },
    ],
    [],
  );

  return (
    <BaseCard>
      <BaseCard.Title label="Top 3 studios with winners" />
      <Table columns={columns} data={top3Studios} isLoading={isLoading} />
    </BaseCard>
  );
};
