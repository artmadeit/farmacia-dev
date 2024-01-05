"use client";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
import { isDate, isValid } from "date-fns";
import format from "date-fns/format";
import { useField } from "formik";
import { useState } from "react";
import yup from "../validation";
import { requiredMessage } from "./helpers/requiredMessage";

type DateType = "year" | "year-month" | "date" | "unknown";
export type InexactDateType = {
  type: DateType;
  value: Date | null;
};

export const defaultDate: InexactDateType = {
  type: "date",
  value: null,
};

export const inexactDateSchema = (
  callback = (x: yup.DateSchema) => x.notRequired()
) =>
  yup.object({
    type: yup.string().required(),
    value: yup.date().when("type", {
      is: (val: DateType) => val === "unknown",
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => callback(schema),
    }),
  });

export function InexactDatePicker({
  label,
  name,
  disabled = false,
  maxDate
}: {
  label?: string;
  name: string;
  disabled?: boolean;
  maxDate?: Date;
}) {
  const [_value, _meta, _helpers] = useField<InexactDateType>(name);
  const [valueField, valueMeta, valueHelpers] = useField<
    InexactDateType["value"]
  >(`${name}.value`);
  const [typeField, typeMeta, typeHelpers] = useField<InexactDateType["type"]>(
    `${name}.type`
  );

  const type = typeField.value;
  const value = valueField.value;
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = (event.target as HTMLInputElement).value as DateType;
    valueHelpers.setValue(type === "unknown" ? null : value);
    typeHelpers.setValue(type);
    typeHelpers.setTouched(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <FormControl
        variant="outlined"
        error={Boolean(
          valueMeta.error && (valueMeta.touched || typeMeta.touched)
        )}
      >
        {label && <InputLabel htmlFor="inexact-date">{label}</InputLabel>}
        <OutlinedInput
          id="inexact-date"
          type="text"
          readOnly
          value={
            type === "unknown"
              ? "-"
              : type && value && isDate(value) && isValid(value)
              ? type === "year"
                ? value.getFullYear()
                : type === "year-month"
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
                disabled={disabled}
              >
                <EditIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>
          {valueMeta.touched || typeMeta.touched ? valueMeta.error : ""}
        </FormHelperText>
      </FormControl>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <FormControl>
            {label && <FormLabel id="unspecific-date">{label}</FormLabel>}
            <RadioGroup
              aria-labelledby="unspecific-date"
              value={type}
              onChange={handleChange}
            >
              <FormControlLabel
                value="unknown"
                control={<Radio />}
                label="Desconocido"
              />
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
            {type !== "unknown" && (
              <DatePicker
                maxDate={maxDate}
                value={value}
                onChange={(newValue) => {
                  valueHelpers.setValue(newValue);
                  valueHelpers.setTouched(true);
                }}
                views={
                  type === "year"
                    ? ["year"]
                    : type === "year-month"
                    ? ["month", "year"]
                    : undefined
                }
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
