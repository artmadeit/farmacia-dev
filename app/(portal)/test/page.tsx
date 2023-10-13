"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import format from "date-fns/format";
import { isDate, isValid } from "date-fns";

export default function TestPage() {
  const [value, setValue] = useState<Date | null>(null);
  const [dateType, setDateType] = useState("date");
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateType((event.target as HTMLInputElement).value);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="inexact-date">Fecha</InputLabel>
        <OutlinedInput
          id="inexact-date"
          type="text"
          readOnly
          value={
            dateType && value && isDate(value) && isValid(value)
              ? dateType === "year"
                ? value.getFullYear()
                : dateType === "year-month"
                ? format(value, "MM-yyyy")
                : value.toLocaleDateString()
              : ""
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="edit"
                onClick={() => setOpen(true)}
                edge="end"
              >
                <EditIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <FormControl>
            <FormLabel id="unspecific-date">Fecha</FormLabel>
            <RadioGroup
              aria-labelledby="unspecific-date"
              name="radio-buttons-group"
              value={dateType}
              onChange={handleChange}
            >
              <FormControlLabel
                value="year"
                control={<Radio />}
                label="Solo sé el año"
              />
              <FormControlLabel
                value="year-month"
                control={<Radio />}
                label="Sé el año y mes"
              />
              <FormControlLabel
                value="date"
                control={<Radio />}
                label="Sé la fecha exacta"
              />
            </RadioGroup>
          </FormControl>
          <Stack>
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
              views={
                dateType === "year"
                  ? ["year"]
                  : dateType === "year-month"
                  ? ["month", "year"]
                  : undefined
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
