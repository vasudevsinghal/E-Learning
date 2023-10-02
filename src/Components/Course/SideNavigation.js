import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {
  BsChevronRight,
  BsChevronLeft,
  BsFillCameraVideoFill,
  BsFilePerson,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));



export default function SideNavigation({ open, setOpen, setIsLec, DrawerHeader }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <BsChevronRight /> : <BsChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem
          key={0}
          onClick={() => {
            setIsLec(true);
            setOpen(false);
          }}
          disablePadding
          sx={{ display: "block" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <BsFillCameraVideoFill />
            </ListItemIcon>
            <ListItemText primary={"Lectures"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <ListItem
          key={1}
          onClick={() => {
            setIsLec(false);
            setOpen(false);
          }}
          disablePadding
          sx={{ display: "block" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <BsFilePerson />
            </ListItemIcon>
            <ListItemText primary={"Students"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <ListItem
          key={2}
          onClick={() => {
            navigate("/", { replace: true });
          }}
          disablePadding
          sx={{ display: "block" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <BsFillArrowLeftCircleFill />
            </ListItemIcon>
            <ListItemText primary={"Back"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}
