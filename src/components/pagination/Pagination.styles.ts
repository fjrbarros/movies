import { Box, styled } from "@mui/material";

export const PaginationWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
