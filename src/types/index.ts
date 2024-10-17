import type * as Icons from "@mui/icons-material";
import type { To } from "react-router-dom";

export interface IModule {
  id: string;
  icon: keyof typeof Icons;
  title: string;
  uri: To;
  isSelected?: boolean;
}
