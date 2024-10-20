import { Box, TableCell, TableRow } from "@mui/material";
import type { PropsWithChildren } from "react";

interface INoDataWrapperProps extends PropsWithChildren {
  colSpan: number;
  messateType?: "loading" | "empty" | "error";
}

export const NoDataWrapper = ({
  colSpan,
  messateType = "loading",
  children,
}: INoDataWrapperProps) => {
  const isLoading = messateType === "loading";

  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" sx={{ py: 10 }}>
        <Box
          display="flex"
          flexDirection={isLoading ? "row" : "column"}
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          {children}
        </Box>
      </TableCell>
    </TableRow>
  );
};
