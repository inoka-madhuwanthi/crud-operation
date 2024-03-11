import { useState } from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import dayjs from "dayjs";

import DataModal from "../components/addEvents/Modal";
import DataTable from "../components/addEvents/Table";
// import { useEffect } from "react";
// import api from "../api/api";

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

  //   useEffect(() => {
  //     api.getTableData().then((data) => setTableData(data));
  //   }, []);

  const handleModalClose = () => setModalOpen(false);

  const handleModalOpen = () => {
    const id = Math.random().toString(36).substr(2, 9);

    setModalOpen(true);
    setModalData({
      ...initialModalData,
      id,
    });
  };

  const handleDataAdded = (newData) => {
    setTableData((prevData) => {
      const index = prevData.findIndex((item) => item.id === newData.id);

      if (index !== -1) {
        prevData[index] = newData;
        return prevData;
      }

      return [...prevData, newData];
    });

    setModalOpen(false);
  };

  const handleEdit = (index) => {
    const currentData = tableData[index];
    setModalData(currentData);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
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
        style={{ background: "#e2f4fd"}}
        >
          <Stack gap={2}>
            <Box>
              <Button
                onClick={handleModalOpen}
                startIcon={<AddIcon />}
                variant="contained"
                style={{ width:180, backgroundColor:'green'}}
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
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

export default AddEvents;
