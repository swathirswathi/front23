import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./Cars.css";

export default function DateRangePickerValue() {
  const [start, setstart] = React.useState(dayjs());
  const [end, setend] = React.useState(dayjs());
  
  return (
    <>
      <span className="starttime">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker label="Start Date" value={start} onChange={(newValue) => setstart(newValue)} format="LLL"/>
          </DemoContainer>
        </LocalizationProvider>
      </span>
      <span className="endtime">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker label="End Date" value={end} onChange={(newValue) => setend(newValue)} format="LLL"/>
          </DemoContainer>
        </LocalizationProvider>
      </span>
    </>
  );
}
