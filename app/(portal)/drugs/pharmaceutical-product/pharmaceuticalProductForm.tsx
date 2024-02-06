"use client";

import { Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { PharmaceuticalProduct } from "./pharmaceuticalProduct";
import { useAuthApi } from "@/app/(api)/api";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import React from "react";
import { useRouter } from "next/navigation";

type PharmaceuticalProductFormProps = {
  textName: string;
  pharmaceuticalProduct: PharmaceuticalProduct;
};

const PharmaceuticalProductForm = ({
  textName,
  pharmaceuticalProduct,
}: PharmaceuticalProductFormProps) => {
  const getApi = useAuthApi();
  const snackbar = React.useContext(SnackbarContext);
  const router = useRouter();

  const savePharmaceuticalProduct = async (
    values: PharmaceuticalProduct,
    { setSubmitting }: FormikHelpers<PharmaceuticalProduct>
  ) => {
    const api = await getApi();
    setSubmitting(false);

    const data = {
      ...values,
      fullName: `${values.name} ${values.concentration} ${values.form}`,
    };

    if (pharmaceuticalProduct.id) {
      await api.put(
        `/drugPharmaceuticalProducts/${pharmaceuticalProduct.id}`,
        data
      );
    } else {
      await api.post(`/drugPharmaceuticalProducts`, data);
    }

    snackbar.showMessage("Se ha guardado exitosamente");
    router.push("/drugs/pharmaceutical-product");
  };

  return (
    <Grid container spacing={2}>
      <Grid>
        <Formik
          initialValues={pharmaceuticalProduct}
          onSubmit={savePharmaceuticalProduct}
        >
          {({ isSubmitting }) => (
            <Form>
              <Typography variant="h4">
                {textName} productos farmaceuticos
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
                  <Field
                    component={TextField}
                    name="concentration"
                    label="Concentración"
                    variant="outlined"
                    required
                  />
                  <Field
                    component={TextField}
                    name="form"
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

export default PharmaceuticalProductForm;
