import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
  styled,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

type InputProps = TextFieldProps & {
  onSearch?: (value: string) => void;
  isLoading?: boolean;
};

const SearchField = styled(TextField)({
  "input::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },

  "input[type=number]": {
    MozAppearance: "textfield",
  },
});

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
      <SearchField
        label={label}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        {...rest}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear value"
                  size="medium"
                  onClick={handleClear}
                >
                  <ClearIcon fontSize="inherit" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
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
