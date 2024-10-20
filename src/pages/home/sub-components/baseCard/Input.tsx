import { SearchInput } from "@components";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, type TextFieldProps } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

type InputProps = TextFieldProps & {
  onSearch?: (value: string) => void;
  isLoading?: boolean;
};

export const Input = ({ label, onSearch, isLoading, ...rest }: InputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleClear = () => {
    setInputValue("");
    onSearch?.("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(inputValue);
  };

  return (
    <Box
      component="form"
      display="flex"
      gap="15px"
      marginBottom="12px"
      alignItems="center"
      onSubmit={handleSubmit}
    >
      <SearchInput
        label={label}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onCLickClear={handleClear}
        {...rest}
      />
      <Button
        type="submit"
        disabled={isLoading}
        aria-label="search button"
        sx={{ minWidth: "auto", padding: "10px" }}
      >
        {isLoading ? <CircularProgress size="24px" /> : <SearchIcon />}
      </Button>
    </Box>
  );
};
