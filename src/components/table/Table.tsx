import {
  DEFAULT_EMPTY_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_LOADING_MESSAGE,
} from "@constants";
import InfoIcon from "@mui/icons-material/Info";
import ReportIcon from "@mui/icons-material/Report";
import {
  Box,
  Table as MuiTable,
  type SxProps,
  type Theme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { ITableColumn, TInputType } from "@types";
import { useState } from "react";
import { StyledTableRow } from "./Table.styles";
import { InputFilter } from "./sub-components/InputFilters";
import { NoDataWrapper } from "./sub-components/NoDataWrapper";

interface TableProps<T> {
  columns: ITableColumn[];
  data: T[];
  onFilterChange?: (
    filters: { [key: string]: string },
    inputType?: TInputType,
  ) => void;
  isLoading?: boolean;
  isError?: boolean;
  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  sx?: SxProps<Theme>;
}

export const Table = <T,>({
  columns,
  data,
  onFilterChange,
  isLoading = false,
  isError = false,
  loadingMessage = DEFAULT_LOADING_MESSAGE,
  errorMessage = DEFAULT_ERROR_MESSAGE,
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
  sx,
}: TableProps<T>) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (columnId: string, value: string) => {
    const newFilters = {
      ...filters,
      [columnId]: value,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const renderTableBody = () => {
    const colSpan = columns.length;

    if (isLoading) {
      return (
        <NoDataWrapper colSpan={colSpan}>
          {loadingMessage}
          <CircularProgress size={20} />
        </NoDataWrapper>
      );
    }

    if (isError) {
      return (
        <NoDataWrapper messateType="error" colSpan={colSpan}>
          <ReportIcon color="error" />
          {errorMessage}
        </NoDataWrapper>
      );
    }

    if (!data.length) {
      return (
        <NoDataWrapper messateType="empty" colSpan={colSpan}>
          <InfoIcon color="info" />
          {emptyMessage}
        </NoDataWrapper>
      );
    }

    return data.map((row, index) => (
      <StyledTableRow key={`row-${index}`}>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.bodyTextAlign || "left"}
            sx={column.sx}
          >
            {String(row[column.id as keyof T])}
          </TableCell>
        ))}
      </StyledTableRow>
    ));
  };

  return (
    <TableContainer>
      <MuiTable sx={sx}>
        <TableHead sx={{ background: "#f9f9f9" }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.headerTextAlign || "left"}
                sx={column.sx}
              >
                <Box display="flex" flexDirection="column">
                  {column.label}
                  {column.filter && (
                    <InputFilter
                      value={filters[column.id] ?? ""}
                      onChange={(event) =>
                        handleFilterChange(column.id, event as string)
                      }
                      label={column.filter.placeholder}
                      variant="standard"
                      size="medium"
                      margin="dense"
                      type={column.filter.type}
                      options={column.filter.options}
                      onClickClear={() => handleFilterChange(column.id, "")}
                      triggerOnEnter={column.filter.triggerOnEnter}
                    />
                  )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </MuiTable>
    </TableContainer>
  );
};
