import MuiDrawer from "@mui/material/Drawer";
import MuiListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";

export const DrawerContainer = styled(MuiDrawer)(({ theme }) => ({
  width: theme.drawer.width,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: theme.drawer.width,
    boxSizing: "border-box",
  },
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface ListItemProps {
  isSelected?: boolean;
}

export const ListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<ListItemProps>(({ theme, isSelected }) => ({
  background: isSelected && isSelected ? "#95959517" : "transparent",

  "& .MuiListItemIcon-root, .MuiListItemText-primary": {
    color: isSelected ? "#1677ff" : theme.palette.text.primary,
  },
  "&:hover": {
    background: isSelected && theme.palette.action.hover,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    right: 0,
    top: 0,
    width: 2.5,
    height: "100%",
    background: isSelected ? "#1677ff" : "transparent",
  },
}));
