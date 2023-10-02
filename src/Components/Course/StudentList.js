import * as React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function StudentList({ Students }) {
  const nodes = [
    { id: 1, name: "node 1", dependsOn: [] },
    { id: 7, name: "node 7", dependsOn: [] },
    { id: 2, name: "node 2", dependsOn: [1] },
    { id: 3, name: "node 3", dependsOn: [2] },
    { id: 4, name: "node 4", dependsOn: [2] },
    { id: 5, name: "node 5", dependsOn: [4, 7] },
  ];

  const [open, setOpen] = React.useState(false);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {Students.map((value, index) => {
        return (
          <>
            <ListItem
              key={index}
              alignItems="flex-start"
              onClick={() => setOpen(true)}
            >
              <ListItemAvatar>
                <Avatar alt={value.name} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={value.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Course Completed
                    </Typography>
                    {` — ${value.progress}%`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
}
