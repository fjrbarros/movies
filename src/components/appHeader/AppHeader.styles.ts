import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import MuiIconButton, {
  type IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";

import { styled } from "@mui/material/styles";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface IconButtonProps extends MuiIconButtonProps {
  open?: boolean;
}

export const IconButton = styled(MuiIconButton)<IconButtonProps>(
  ({ open, theme }) => ({
    mr: 2,
    ...(open && !theme.isSmallScreen && { display: "none" }),
  }),
);

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  position: "fixed",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    !theme.isSmallScreen && {
      width: `calc(100% - ${theme.drawer.width}px)`,
      marginLeft: "240px",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));
