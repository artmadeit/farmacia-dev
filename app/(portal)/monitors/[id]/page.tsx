"use client";

import { Button, Grid, Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";

const EditMonitors = () => {
  return (
    <Grid container>
      <Grid item>
        <Formik
          initialValues={{
            name: "",
            email: "",
          }}
          onSubmit={() => console.log("Enviando")}
        >
          {({ isSubmitting }) => (
            <Form>
              <Typography variant="h4" style={{ paddingBottom: "20px" }}>
                Datos Generales del monitor
              </Typography>
              <Grid>
                <Stack spacing={2}>
                  <Field
                    component={TextField}
                    name="name"
                    label="Nombre"
                    variant="outlined"
                  />
                  <Field
                    component={TextField}
                    type="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                  />
                </Stack>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  style={{ marginTop: "20px" }}
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

export default EditMonitors;
