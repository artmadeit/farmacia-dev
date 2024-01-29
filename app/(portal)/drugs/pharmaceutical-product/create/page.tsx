"use client";

import { Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";

const CreatePharmaceuticalProduct = () => {
  return (
    <Grid container spacing={2}>
      <Grid>
        <Formik
          initialValues={{
            name: "",
            concentration: "",
            shape: "",
          }}
          onSubmit={() => console.log("hola")}
        >
          {({ isSubmitting }) => (
            <Form>
              <Typography variant="h4">Productos Farmaceuticos</Typography>
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
                    name="concentration"
                    label="Concentración"
                    variant="outlined"
                    required
                  />
                  <Field
                    component={TextField}
                    name="shape"
                    label="Forma"
                    variant="outlined"
                    required
                  />
                </Stack>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{ marginTop: "20px" }}
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

export default CreatePharmaceuticalProduct;
