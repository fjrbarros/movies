import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, type TextFieldProps } from "@mui/material";
import * as Styles from "./SearchInput.styles";

type InputProps = TextFieldProps & {
  onCLickClear?: () => void;
};

export const SearchInput = ({
  label,
  value,
  onChange,
  onCLickClear,
  ...rest
}: InputProps) => {
  return (
    <Styles.TextField
      label={label}
      value={value}
      onChange={onChange}
      {...rest}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear value"
                size="medium"
                onClick={onCLickClear}
              >
                <ClearIcon fontSize="inherit" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
