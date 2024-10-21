import {
  Box,
  FormControl,
  MenuItem,
  Pagination as MuiPagination,
  type PaginationProps,
  Select,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";
import { PaginationWrapper } from "./Pagination.styles";

interface IPaginationProps extends PaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

export const Pagination = ({
  rowsPerPageOptions,
  page,
  count,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: IPaginationProps) => {
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent) => {
    const newRowsPerPage = Number.parseInt(event.target.value, 10);
    onRowsPerPageChange(newRowsPerPage);
  };

  return (
    <PaginationWrapper>
      <Box display="flex" alignItems="center" gap="10px">
        <Typography variant="body1" noWrap>
          Rows per page:
        </Typography>
        <FormControl variant="standard">
          <Select
            value={rowsPerPage.toString()}
            onChange={handleRowsPerPageChange}
            sx={{ minWidth: "50px" }}
          >
            {rowsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <MuiPagination
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        onChange={handlePageChange}
      />
    </PaginationWrapper>
  );
};
