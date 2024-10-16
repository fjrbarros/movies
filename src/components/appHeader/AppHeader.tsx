import MenuIcon from "@mui/icons-material/Menu";
import { useScrollTrigger } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppBar, IconButton } from "./AppHeader.styles";

interface AppHeaderProps {
  title?: string;
  openDrawer: boolean;
  handleOpenDrawer?: () => void;
}

export const AppHeader = ({
  openDrawer,
  handleOpenDrawer,
  title = "",
}: AppHeaderProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar open={openDrawer} elevation={trigger ? 3 : 0}>
      <Toolbar>
        <IconButton
          open={openDrawer}
          color="inherit"
          aria-label="open drawer"
          onClick={handleOpenDrawer}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap textAlign="center" width="100%">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
