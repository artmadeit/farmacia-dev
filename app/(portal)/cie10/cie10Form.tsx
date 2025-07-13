import { Button, Grid, Stack, Typography } from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import React, { useContext } from "react";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { useRouter } from "next/navigation";
import { useAuthApi } from "@/app/(api)/api";
import { DiseaseCie10 } from "./DiseaseCie10";

type Cie10FormProps = {
  disease: DiseaseCie10;
  textName: string;
};

const Cie10Form = ({ disease, textName }: Cie10FormProps) => {
  const snackbar = useContext(SnackbarContext);
  const router = useRouter();
  const getApi = useAuthApi();

  const saveDiseaseForm = async (
    values: DiseaseCie10,
    { setSubmitting }: FormikHelpers<DiseaseCie10>
  ) => {
    const api = await getApi();

    setSubmitting(false);

    if (disease.id) {
      await api.put(`/diseases/${disease.id}`, values);
    } else {
      await api.post(`/diseases`, values);
    }
    snackbar.showMessage("Enfermedad guardada");
    router.push("/cie10");
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Formik initialValues={disease} onSubmit={saveDiseaseForm}>
          {({ isSubmitting }) => (
            <Form>
              <Typography variant="h4" style={{ paddingBottom: "20px" }}>
                {textName} Enfermedad
              </Typography>
              <Grid>
                <Stack spacing={2}>
                  <Field
                    component={TextField}
                    name="code"
                    label="Código"
                    variant="outlined"
                    required
                  />
                  <Field
                    component={TextField}
                    name="name"
                    label="Nombre"
                    variant="outlined"
                    required
                  />
                </Stack>
                <Button
                  type="submit"
                  style={{ marginTop: "20px" }}
                  disabled={isSubmitting}
                  variant="contained"
                >
                  Guardar
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Cie10Form;
