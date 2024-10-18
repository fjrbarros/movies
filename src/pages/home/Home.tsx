import { PageWrapper, Table } from "@components";
import { homePageName } from "@constants";
import type { ITableColumn } from "@types";
import { useCallback, useEffect, useState } from "react";

interface Data {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

const columns: ITableColumn[] = [
  {
    id: "name",
    label: "Dessert (100g serving)",
    filter: { placeholder: "Filter by dessert" },
  },
  { id: "calories", label: "Calories" },
  {
    id: "fat",
    label: "Fat (g)",
    sx: { minWidth: 100 },
  },
  { id: "carbs", label: "Carbs (g)" },
  {
    id: "protein",
    label: "Protein (g)",
    sx: { minWidth: 100 },
  },
];

const initialData: Data[] = [
  { name: "Frozen yoghurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
  },
  { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
];

export const Home = () => {
  const [data, setData] = useState<Data[]>(initialData);

  const fetchData = useCallback(async (filters: { [key: string]: string }) => {
    const filteredData = initialData.filter((item) =>
      Object.entries(filters).every(([key, value]) =>
        item[key as keyof Data]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      ),
    );
    setData(filteredData);
  }, []);

  useEffect(() => {
    fetchData({});
  }, [fetchData]);

  const handleFilterChange = (filters: { [key: string]: string }) => {
    fetchData(filters);
  };

  return (
    <PageWrapper pageTitle={homePageName}>
      <Table
        columns={columns}
        data={data}
        onFilterChange={handleFilterChange}
        sx={{ minWidth: 700 }}
      />
    </PageWrapper>
  );
};
