import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { formatDateTime } from "../date";
import { Field, useFormikContext } from "formik";
import { DateTimePicker } from "formik-mui-x-date-pickers";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

type dateInterview = {
  interviewDate: any;
};

export const Title = ({
  children,
  date,
}: {
  children: React.ReactNode;
  date: Date;
}) => {
  const { touched, errors } = useFormikContext<dateInterview>();
  return (
    <Stack>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" gutterBottom>
          {children}
        </Typography>
        <Grid>
          <Typography>Fecha de registro: {formatDateTime(date)}</Typography>
          <Grid container>
            <Grid xs={3}>
              <Field
                component={DateTimePicker}
                sx={{ padding: "10px 0px" }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    label: "Fecha entrevista:",
                    error: touched.interviewDate && !!errors.interviewDate,
                    helperText:
                      touched.interviewDate && errors.interviewDate
                        ? errors.interviewDate
                        : "",
                  },
                }}
                name="interviewDate"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </Stack>
  );
};
