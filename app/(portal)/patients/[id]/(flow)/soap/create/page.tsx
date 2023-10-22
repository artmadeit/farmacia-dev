"use client";

import { Title } from "@/app/(components)/Title";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Form, Formik } from "formik";
import {
  PharmacotherapyTable,
  emptyHistoryRow,
} from "../../pharmacotherapy/PharmacotherapyTable";

export default function CreateSoap() {
  return (
    <div>
      <Title>Hoja de seguimiento</Title>
      <Divider />
      <Formik
        initialValues={{
          history: [{ ...emptyHistoryRow }],
        }}
        onSubmit={() => {}}
      >
        {({ values, errors }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid xs={10} style={{ margin: "10px 0px" }}>
                <strong>Farmacoterapia (P) Prescrito (A) Automedicado </strong>
              </Grid>
            </Grid>
            <PharmacotherapyTable name="history" values={values} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
