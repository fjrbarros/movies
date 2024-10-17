import { styled } from "@mui/material";

const marginTopDesktop = 64;
const marginTopMobile = 56;

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  marginTop: marginTopDesktop,
  flexGrow: 1,
  minHeight: `calc(100dvh - ${marginTopDesktop}px)`,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.down("sm")]: {
    marginTop: marginTopMobile,
    minHeight: `calc(100dvh - ${marginTopMobile}px)`,
  },
  ...(open &&
    !theme.isSmallScreen && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${theme.drawer.width}px`,
    }),
}));
