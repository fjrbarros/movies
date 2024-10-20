import { SearchInput } from "@components";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import type { TInputType } from "@types";
import { useEffect, useState } from "react";

interface ISelectOption {
  label: string;
  value: string;
}

type InputProps = TextFieldProps & {
  onClickClear?: () => void;
  isLoading?: boolean;
  type?: TInputType;
  options?: ISelectOption[];
  onChange?: (value: string, inputType?: TInputType) => void;
  triggerOnEnter?: boolean;
};

export const InputFilter = ({
  value,
  onChange,
  label,
  onClickClear,
  type = "text",
  options = [],
  triggerOnEnter = false,
  ...rest
}: InputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const isSelect = type === "select";
  const tooltipText = triggerOnEnter ? "Press enter to apply the filter" : "";

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!triggerOnEnter && !isSelect) {
      const handler = setTimeout(() => {
        onChange?.(inputValue as string);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [inputValue, triggerOnEnter, onChange, isSelect]);

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (triggerOnEnter && event.key === "Enter") {
      onChange?.(inputValue as string);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    onChange?.(event.target.value as string);
  };

  const handleClear = () => {
    setInputValue("");
    onChange?.("");
    onClickClear?.();
  };

  if (isSelect) {
    return (
      <FormControl variant="standard" sx={{ m: 1 }}>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          value={value}
          onChange={handleSelectChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <SearchInput
      type={type}
      value={inputValue}
      onChange={handleTextFieldChange}
      onKeyDown={handleKeyDown}
      onClickClear={handleClear}
      label={label}
      tooltipText={tooltipText}
      {...rest}
    />
  );
};
