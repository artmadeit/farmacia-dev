"use client";

import { Grid, Stack, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";

const CreateDrugsPage = () => {
  const saveDrugForm = () => {
    console.log("Guardando");
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          onSubmit={saveDrugForm}
        >
          {({ isSubmitting }) => (
            <Form>
              <Typography variant="h4">Registrar medicamento</Typography>
              <Grid>
                <Stack spacing={2}>
                  <Field
                    component={TextField}
                    name="name"
                    label="Nombre"
                    variant="outlined"
                    required
                  />
                  <Field
                    component={TextField}
                    name="description"
                    label="Descripción"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                  />
                </Stack>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default CreateDrugsPage;