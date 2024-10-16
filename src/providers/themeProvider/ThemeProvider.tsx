import { CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { type PropsWithChildren, useMemo } from "react";
import { createTheme } from "./createTheme";

declare module "@mui/material/styles" {
  interface Theme {
    isSmallScreen: boolean;
    drawer: {
      width: number;
    };
  }
  interface ThemeOptions {
    isSmallScreen?: boolean;
    drawer?: {
      width?: number;
    };
  }
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  let theme = useMemo(createTheme, []);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  theme = {
    ...theme,
    isSmallScreen,
  };

  return (
    <MuiThemeProvider theme={createTheme()}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
