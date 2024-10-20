import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  IconButton,
  InputAdornment,
  type TextFieldProps,
  Tooltip,
} from "@mui/material";
import * as Styles from "./SearchInput.styles";

type InputProps = TextFieldProps & {
  onClickClear?: () => void;
  tooltipText?: string;
};

export const SearchInput = ({
  label,
  value,
  onChange,
  onClickClear,
  tooltipText,
  ...rest
}: InputProps) => {
  return (
    <Styles.TextField
      label={
        <Box display="flex" alignItems="center" gap="5px">
          {label}
          {!!tooltipText && (
            <Tooltip title={tooltipText} arrow>
              <InfoIcon sx={{ width: "19px", height: "19px" }} />
            </Tooltip>
          )}
        </Box>
      }
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
                onClick={onClickClear}
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
