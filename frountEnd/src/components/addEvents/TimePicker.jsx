import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useEffect } from "react";
import PropTypes from "prop-types";

function BasicTimePicker({
  initialTime,
  minTime = null,
  label,
  onTimeChanged,
}) {
  const [value, setValue] = useState(initialTime);

  useEffect(() => setValue(initialTime), [initialTime]);

  const handleChange = (newValue) => {
    setValue(newValue);
    onTimeChanged(newValue.toString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          minTime={minTime}
          label={label}
          value={value}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

BasicTimePicker.propTypes = {
  initialTime: PropTypes.instanceOf(Date).isRequired,
  minTime: PropTypes.instanceOf(Date),
  label: PropTypes.string.isRequired,
  onTimeChanged: PropTypes.func.isRequired,
};

export default BasicTimePicker;
