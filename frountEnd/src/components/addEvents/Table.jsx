
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
        <TableHead style={{background:"#bcb"}} >
          <TableRow>
            <TableCell style={{ minWidth: 100 }}>Start time</TableCell>
            <TableCell style={{ minWidth: 100 }}>End time</TableCell>
            <TableCell style={{ minWidth: 200 }}>Description</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {data
          .map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ minWidth: 100 }}>{dayjs(row.startTime).format("h:mm A")}</TableCell>
              <TableCell style={{ minWidth: 100 }}>{dayjs(row.endTime).format("h:mm A")}</TableCell>
              <TableCell style={{ minWidth: 200 }}>{row.description}</TableCell>

              <TableCell style={{ minWidth: 50 }}>
                <IconButton onClick={() => onEdit(index)} style={{ maxWidth: 40 }}>
                  <EditIcon color="primary" />
                </IconButton>

                <IconButton onClick={() => onDelete(index)} style={{ maxWidth: 40 }}>
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
  data: PropTypes.array.isRequired,  
};

export default DataTable;
