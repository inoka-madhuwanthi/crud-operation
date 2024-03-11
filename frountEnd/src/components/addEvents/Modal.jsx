import { useState } from "react";
import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BasicTimePicker from "./TimePicker";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function DataModal({ modalData, open, onClose, onDataAdded }) {
  const [data, setData] = useState(modalData);

  useEffect(() => setData(modalData), [modalData]);

  const handleDesciptionChange = (event) => {
    setData((prevData) => {
      return { ...prevData, description: event.target.value };
    });
  };

  const handleTimeChange = (key, timeString) => {
    setData((prevData) => {
      return { ...prevData, [key]: dayjs(timeString) };
    });
  };

  return (
    <div>
      <Modal open={open} onClose={onClose} >
        <Paper sx={modalStyle} style={{background:'#d8fbfa'}}>
          <Stack gap={1}>
            <Typography variant="h6" component="h2">
              Select a timeframe
            </Typography>

            <Stack direction="row" gap={1}>
              <BasicTimePicker
                initialTime={data.startTime}
                label="start time"
                onTimeChanged={(timeString) => handleTimeChange("startTime", timeString)}
              />
              <BasicTimePicker
                initialTime={data.endTime}
                minTime={data.startTime}
                label="end time"
                onTimeChanged={(timeString) => handleTimeChange("endTime", timeString)}
              />
            </Stack>

            <TextField
              value={data.description}
              onChange={handleDesciptionChange}
              multiline
              rows={4}
              fullWidth
              placeholder="description"
            />
          </Stack>

          <Button
            size="large"
            variant="contained"
            onClick={() => onDataAdded(data)}
            sx={{
              marginTop: 1,
              width: 100,
              backgroundColor:'green'
            }}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </div>
  );
}

DataModal.propTypes = {
  modalData: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDataAdded: PropTypes.func.isRequired,
};

export default DataModal;
