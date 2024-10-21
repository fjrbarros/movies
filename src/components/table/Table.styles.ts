import { Box, TableRow, styled } from "@mui/material";

export const StyledTableRow = styled(TableRow)({
  transition: "background-color 0.1s",
  "&:nth-of-type(2n)": {
    backgroundColor: "#f9f9f9",
  },
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
});

export const PaginationContainer = styled(Box)({
  padding: "10px 0",
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
});
