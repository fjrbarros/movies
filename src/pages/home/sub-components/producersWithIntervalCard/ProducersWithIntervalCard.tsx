import { useGetProducersWithInterval } from "@api";
import { Table } from "@components";
import type { ITableColumn } from "@types";
import { useMemo } from "react";
import { BaseCard } from "../baseCard/BaseCard";

export const ProducersWithIntervalCard = () => {
  const { data, isLoading, isError } = useGetProducersWithInterval();

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        id: "producer",
        label: "Producer",
        sx: { width: "25%", minWidth: "150px" },
      },
      { id: "interval", label: "Interval", sx: { width: "25%" } },
      {
        id: "previousWin",
        label: "Previous Year",
        sx: { width: "25%", minWidth: "125px" },
      },
      {
        id: "followingWin",
        label: "Following Year",
        sx: { width: "25%", minWidth: "130px" },
      },
    ],
    [],
  );

  return (
    <BaseCard>
      <BaseCard.Title label="Producers with longest and shortest interval between wins" />
      <BaseCard.SubTitle label="Maximum" />
      <Table
        columns={columns}
        data={data.max}
        isLoading={isLoading}
        isError={isError}
      />
      <BaseCard.SubTitle label="Minimum" marginTop="10px" />
      <Table
        columns={columns}
        data={data.min}
        isLoading={isLoading}
        isError={isError}
      />
    </BaseCard>
  );
};
