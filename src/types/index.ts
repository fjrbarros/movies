import type * as Icons from "@mui/icons-material";
import type { SxProps, Theme } from "@mui/material";
import type { To } from "react-router-dom";

export interface IModule {
  id: string;
  icon: keyof typeof Icons;
  title: string;
  uri: To;
  isSelected?: boolean;
}

interface ISelectOption {
  label: string;
  value: string;
}
interface IFilter {
  type?: "text" | "select" | "number";
  placeholder: string;
  options?: ISelectOption[];
}

export interface ITableColumn {
  id: string;
  label: string;
  headerTextAlign?: "left" | "right" | "center";
  bodyTextAlign?: "left" | "right" | "center";
  filter?: IFilter;
  sx?: SxProps<Theme>;
}
