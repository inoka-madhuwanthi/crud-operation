

import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import DataModal from "../components/addEvents/Modal";
import DataTable from "../components/addEvents/Table";
import DeleteConfirmationDialog from "../components/addEvents/DeleteConfirmationDialog";

const initialModalData = {
  id: "0",
  startTime: dayjs(),
  endTime: dayjs(),
  description: "",
};

function AddEvents() {
  const [tableData, setTableData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(initialModalData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleModalClose = () => setModalOpen(false); //Closes the modal.

  //Opens the modal and generates a unique id for new data.
  const handleModalOpen = () => {
    const id = Math.random().toString(36).substr(2, 9);

    setModalOpen(true);
    setModalData({
      ...initialModalData,
      id,
    });
  };

  // Updates the table data with new or edited data and closes the modal.
  const handleDataAdded = (newData) => {
    setTableData((prevData) => {
      const index = prevData.findIndex((item) => item.id === newData.id);

      if (index !== -1) {
        // If newData with the same id already exists in prevData, update it
        prevData[index] = newData;
        return prevData;
      }

      // If newData doesn't exist in prevData, add it to the end
      return [...prevData, newData];
    });

    setModalOpen(false);
  };

  //Sets the modal data to the data being edited and opens the modal.
  const handleEdit = (index) => {
    const currentData = tableData[index];
    setModalData(currentData);
    setModalOpen(true);
  };

  

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const newData = [...tableData];
    newData.splice(deleteIndex, 1);
    setTableData(newData);
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };


  return (
    <>
      <Stack marginTop={1} alignItems="center">
        <Paper
          sx={{
            width: 900,
            minHeight: 400,
            padding: 2,
          }}
          style={{ background: "#e2f4fd" }}
        >
          <Stack gap={2}>
            <Box>
              <Button
                onClick={handleModalOpen}
                startIcon={<AddIcon />}
                variant="contained"
                style={{ width: 180, backgroundColor: "green" }}
              >
                Add Event
              </Button>
            </Box>
            <DataModal
              modalData={modalData}
              open={modalOpen}
              onClose={handleModalClose}
              onDataAdded={handleDataAdded}
            />
            <DataTable
              data={tableData}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <DeleteConfirmationDialog
              open={deleteDialogOpen}
              onClose={handleCloseDeleteDialog}
              onConfirm={handleConfirmDelete}
            />
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

export default AddEvents;
