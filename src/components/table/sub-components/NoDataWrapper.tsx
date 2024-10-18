import { TableCell, TableRow } from "@mui/material";
import type { PropsWithChildren } from "react";

interface INoDataWrapperProps extends PropsWithChildren {
  colSpan: number;
}

export const NoDataWrapper = ({ colSpan, children }: INoDataWrapperProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" sx={{ py: 10 }}>
        {children}
      </TableCell>
    </TableRow>
  );
};
