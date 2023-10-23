"use client";
import { useAuthApi } from "@/app/(api)/api";
import { Page } from "@/app/(api)/pagination";
import {
  InexactDatePicker,
  InexactDateType,
  defaultDate,
} from "@/app/(components)/InexactDatePicker";
import { AsyncAutocomplete } from "@/app/(components)/autocomplete";
import { DrugProduct } from "@/app/(portal)/drugs/pharmaceutical-product/Drug";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { ArrayHelpers, Field, FieldArray } from "formik";
import { RadioGroup, TextField } from "formik-mui";
import React from "react";
import { TABLE_WIDTH_DATE, TABLE_WIDTH_ACTION } from "./page";

export const emptyHistoryRow = {
  administration: "",
  difficulty: "",
  difficultyJustification: "",
  acceptance: "",
  reasonForUse: "",
  restartDate: defaultDate,
  startDate: defaultDate,
  suspensionDate: defaultDate,
  dose: "",
  mode: "",
  drug: "",
};

export type PharmaceuticHistoryRow = {
  administration: string;
  difficulty: string;
  difficultyJustification: string;
  acceptance: string;
  reasonForUse: string;
  restartDate: InexactDateType;
  startDate: InexactDateType;
  suspensionDate: InexactDateType;
  dose: string;
  mode: string;
  drug: string | DrugProduct;
};

export const PharmacotherapyTable = <T extends string>({
  values,
  name,
}: {
  name: T;
  values: {
    [key in T]: PharmaceuticHistoryRow[];
  };
}) => {
  const getApi = useAuthApi();
  const [open, setOpen] = React.useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const searchDrugPharmaceuticalProducts = (searchText: string) =>
    getApi().then((api) =>
      api
        .get<Page<DrugProduct>>(
          "drugPharmaceuticalProducts/search/findByFullName",
          {
            params: { page: 0, searchText },
          }
        )
        .then((x) => x.data._embedded.drugPharmaceuticalProducts)
    );

  return (
    <TableContainer component={Paper}>
      <FieldArray name={name}>
        {(arrayHelpers: ArrayHelpers) => (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 300 }}>Medicamento</TableCell>
                <TableCell style={{ width: 50 }}>P/A</TableCell>
                <TableCell style={{ minWidth: 200 }} align="center">
                  Dosis
                </TableCell>
                <TableCell style={{ width: TABLE_WIDTH_DATE }} align="center">
                  Fecha inicio
                </TableCell>
                <TableCell style={{ width: TABLE_WIDTH_DATE }} align="center">
                  Fecha susp
                </TableCell>
                <TableCell sx={{ width: 2 * TABLE_WIDTH_ACTION }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values[name].map((item, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>
                      <AsyncAutocomplete
                        label="Medicamento"
                        field={`${name}.${index}.drug`}
                        getLabel={(option) => option.fullName}
                        filter={searchDrugPharmaceuticalProducts}
                      />
                    </TableCell>
                    <TableCell>
                      <Field
                        component={RadioGroup}
                        name={`${name}.${index}.mode`}
                        row
                      >
                        <FormControlLabel
                          value="P"
                          control={<Radio />}
                          label="P"
                        />
                        <FormControlLabel
                          value="A"
                          control={<Radio />}
                          label="A"
                        />
                      </Field>
                    </TableCell>
                    <TableCell>
                      <Field
                        name={`${name}.${index}.dose`}
                        component={TextField}
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <InexactDatePicker name={`${name}.${index}.startDate`} />
                    </TableCell>
                    <TableCell>
                      <InexactDatePicker
                        name={`${name}.${index}.suspensionDate`}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Eliminar">
                        <IconButton
                          aria-labelledby="eliminar"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Ver más">
                        <IconButton
                          aria-labelledby="Ver"
                          onClick={() => setOpen(true)}
                        >
                          <SearchIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <Dialog open={open} onClose={onClose}>
                    <DialogTitle style={{ fontSize: "1rem" }}>
                      Otra información
                    </DialogTitle>
                    <DialogContent>
                      <Stack spacing={2}>
                        <InexactDatePicker
                          name={`${name}.${index}.restartDate`}
                          label="Fecha rein."
                        />
                        <Field
                          name={`${name}.${index}.reasonForUse`}
                          component={TextField}
                          variant="outlined"
                          label="Motivo de uso"
                        />
                        <FormControl>
                          <FormLabel id="acceptance-radio-group">
                            Aceptación
                          </FormLabel>
                          <Field
                            component={RadioGroup}
                            name={`${name}.${index}.acceptance`}
                            row
                          >
                            <FormControlLabel
                              value="Si"
                              control={<Radio />}
                              label="Si"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                            <FormControlLabel
                              value="No aplica"
                              control={<Radio />}
                              label="No aplica"
                            />
                          </Field>
                        </FormControl>
                        <Field
                          name={`${name}.${index}.administration`}
                          component={TextField}
                          label="Administración"
                          variant="outlined"
                        />
                        <FormControl>
                          <FormLabel id="difficulty-radio-group">
                            Dificultades para tomarlo y/o tolerarlo
                          </FormLabel>
                          <Field
                            component={RadioGroup}
                            name={`${name}.${index}.difficulty`}
                            row
                          >
                            <FormControlLabel
                              value="Si"
                              control={<Radio />}
                              label="Si"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </Field>
                          {item.difficulty === "Si" && (
                            <Field
                              name={`${name}.${index}.difficultyJustification`}
                              multiline
                              rows={4}
                              component={TextField}
                              label="Comentarios"
                              variant="outlined"
                            />
                          )}
                        </FormControl>
                      </Stack>
                    </DialogContent>
                    <DialogActions sx={{ padding: "20px 24px" }}>
                      <Button variant="contained" onClick={onClose}>
                        Guardar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => {
                      arrayHelpers.push(emptyHistoryRow);
                    }}
                  >
                    Agregar fila
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </FieldArray>
    </TableContainer>
  );
};
