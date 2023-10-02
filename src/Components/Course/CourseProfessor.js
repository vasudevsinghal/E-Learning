import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { BsList } from "react-icons/bs";
import StudentList from "./StudentList";
import CourseDetails from "../../data/CourseDetails";
import Students from "../../data/Students";
import LectureDetails from "./LectureDetails";
import SideNavigation from "./SideNavigation";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CourseProfessor = () => {
  const [open, setOpen] = React.useState(false);
  const [isLec, setIsLec] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <BsList />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {CourseDetails.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <SideNavigation open={open} setOpen={setOpen} setIsLec={setIsLec} DrawerHeader={DrawerHeader} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {isLec ? (
          <LectureDetails CourseDetails={CourseDetails} />
        ) : (
          <StudentList Students={Students}></StudentList>
        )}
      </Box>
    </Box>
  );
};

export default CourseProfessor;
