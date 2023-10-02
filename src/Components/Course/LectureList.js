import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SimpleDialog from "./SimpleDialog.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function LectureList(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Lecture Name</StyledTableCell>
            <StyledTableCell align="right">Duration</StyledTableCell>
            <StyledTableCell align="right">Views</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.videos.map((row) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="right">{row.duration}</StyledTableCell>
              <StyledTableCell align="right" onClick={() => {setOpen(true)}}>{row.views}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <SimpleDialog open={open} setOpen={setOpen} />
    </TableContainer>
  );
}
