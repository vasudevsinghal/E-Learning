import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  BsFillPersonLinesFill
} from "react-icons/bs";
import { blue } from '@mui/material/colors';

const names = ['ABC', 'ABD', 'ABC', 'ABD', 'ABC', 'ABD', 'ABC', 'ABD', 'ABC', 'ABD', 'ABC', 'ABD', 'ABD', 'ABC', 'ABD', 'ABC', 'ABD', 'ABC', 'ABD'];

export default function SimpleDialog(props) {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (value) => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Students watched this Lecture</DialogTitle>
      <List sx={{ pt: 0 }}>
        {names.map((name, idx) => (
          <ListItem button onClick={() => handleListItemClick(name)} key={idx}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <BsFillPersonLinesFill />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}