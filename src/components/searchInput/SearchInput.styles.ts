import styled from "@emotion/styled";
import { TextField as MuiTextField } from "@mui/material";

export const TextField = styled(MuiTextField)({
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
