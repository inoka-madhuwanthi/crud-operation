// import * as React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";


function DataTable({ data, onEdit, onDelete }) {
  return (
    <TableContainer >
      <Table>
        <TableHead style={{background:"#bcb"}}>
          <TableRow>
            <TableCell>Start time</TableCell>
            <TableCell>End time</TableCell>
            <TableCell>Description</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{dayjs(row.startTime).format("h:mm A")}</TableCell>
              <TableCell>{dayjs(row.endTime).format("h:mm A")}</TableCell>
              <TableCell>{row.description}</TableCell>

              <TableCell>
                <IconButton onClick={() => onEdit(index)}>
                  <EditIcon color="primary" />
                </IconButton>

                <IconButton onClick={() => onDelete(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DataTable.propTypes = {
  onDelete: PropTypes.func.isRequired, 
  onEdit: PropTypes.func.isRequired,   
  data: PropTypes.object.isRequired,  
};

export default DataTable;
