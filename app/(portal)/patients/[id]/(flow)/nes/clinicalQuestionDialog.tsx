import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { ArrayHelpers, Field, FieldArray } from "formik";
import { TextField } from "formik-mui";
import { emptyPicoRow } from "./page";
import { PicoRow } from "./PicoRow";
import { PicoMedicine } from "./PicoMedicine";

type ClinicalQuestionDialogProps = {
  open: boolean;
  handleClose: () => void;
  values: PicoMedicine[];
};

export const ClinicalQuestionDialog = ({
  open,
  handleClose,
  values,
}: ClinicalQuestionDialogProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>PREGUNTA CLINÍCA:</DialogTitle>
      <DialogContent>
        <FieldArray name="picoSheets">
          {(arrayHelpers: ArrayHelpers) => (
            <>
              {values.map((x, index) => (
                <>
                  {values.length > 1 && (
                    <Grid xs={12} display="flex" justifyContent="end">
                      <Tooltip title="Eliminar">
                        <Fab
                          aria-label="delete"
                          sx={{ margin: "10px 0px" }}
                          color="primary"
                          onClick={arrayHelpers.handleRemove(index)}
                        >
                          <CloseIcon />
                        </Fab>
                      </Tooltip>
                    </Grid>
                  )}

                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>Español</TableCell>
                          <TableCell>Inglés</TableCell>
                          <TableCell>Término Mesh</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <React.Fragment key={index}>
                          <TableRow>
                            <TableCell>P</TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.patient.spanish`}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.patient.english`}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.patient.meshTerm`}
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>I</TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.intervention.spanish`}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.intervention.english`}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.intervention.meshTerm`}
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>C</TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.comparison.spanish`}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.comparison.english`}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.comparison.meshTerm`}
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>O</TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.outcome.spanish`}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.outcome.english`}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                component={TextField}
                                name={`picoSheets.${index}.outcome.meshTerm`}
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box>
                    <Field
                      component={TextField}
                      name={`picoSheets.${index}.clinicalQuestion`}
                      label="Pregunta clínica"
                      variant="outlined"
                      fullWidth
                      sx={{ margin: "10px 0px" }}
                    />
                    <Field
                      component={TextField}
                      name={`picoSheets.${index}.searchStrategy`}
                      multiline
                      variant="outlined"
                      label="Estrategia(s) Búsqueda"
                      placeholder="Describa las palabras claves y los motores de búsqueda que utilizó"
                      rows={4}
                      fullWidth
                    />
                  </Box>
                </>
              ))}

              <Box>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => arrayHelpers.push(emptyPicoRow)}
                >
                  Agregar otra fila
                </Button>
              </Box>
            </>
          )}
        </FieldArray>
      </DialogContent>
    </Dialog>
  );
};

export default ClinicalQuestionDialog;
