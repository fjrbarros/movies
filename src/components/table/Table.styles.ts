import { TableRow, styled } from "@mui/material";

export const StyledTableRow = styled(TableRow)({
  transition: "background-color 0.1s",
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
});
