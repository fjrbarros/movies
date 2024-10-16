import { drawerWidth } from "@constants";
import { createTheme as muiCreateTheme } from "@mui/material/styles";

export const createTheme = () => {
  return muiCreateTheme({
    drawer: {
      width: drawerWidth,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
          containedPrimary: {
            background: "#1677ff",
            color: "#ffffff",
          },
        },
        defaultProps: {
          variant: "contained",
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "standard",
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          "*": {
            "::-webkit-scrollbar": {
              width: "10px",
              height: "10px",
              backgroundColor: "#000",
              borderRadius: "5px",
            },
            "::-webkit-scrollbar-track": {
              boxShadow: "inset 0px 0px 3px rgba(0,0,0,.5)",
              backgroundColor: "#f5f5f5",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#bbb",
              borderRadius: "5px",
            },
          },
        },
      },
    },
  });
};
