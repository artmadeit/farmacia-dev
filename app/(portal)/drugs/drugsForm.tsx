import { api } from "@/app/(api)/api";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import React, { useContext } from "react";
import { Drug } from "./Drug";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import { useRouter } from "next/navigation";

type DrugFormProps = {
  drugs: Drug;
};

const DrugForm = ({ drugs }: DrugFormProps) => {
  const snackbar = useContext(SnackbarContext);
  const router = useRouter();

  const saveDrugForm = async (
    values: Drug,
    { setSubmitting }: FormikHelpers<Drug>
  ) => {
    setSubmitting(false);
    if (drugs.id) {
      await api.put(`/drugs/${drugs.id}`, values);
    } else {
      await api.post(`/drugs`, values);
    }
    snackbar.showMessage("Hola");
    router.push("/");
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Formik
          initialValues={drugs}
          onSubmit={saveDrugForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <Typography variant="h4" style={{ paddingBottom: "20px" }}>
                Registrar medicamento
              </Typography>
              <Grid>
                <Stack spacing={2}>
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

export default DrugForm;
