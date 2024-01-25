import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { formatDateTime } from "../date";
import { Field } from "formik";
import { DatePicker, DateTimePicker } from "formik-mui-x-date-pickers";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const Title = ({
  children,
  date,
}: {
  children: React.ReactNode;
  date: Date;
}) => {
  return (
    <Stack>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" gutterBottom>
          {children}
        </Typography>
        <Grid>
          <Typography>Fecha de registro: {formatDateTime(date)}</Typography>
          <Grid container>
            {/* <Typography> */}
            <Grid xs={3}>
              <Field
                component={DateTimePicker}
                sx={{ padding: "10px 0px" }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    label: "Fecha entrevista:",
                    // error: touched.surveyDate && !!errors.surveyDate,
                    // helperText:
                    //   touched.surveyDate && errors.surveyDate
                    //     ? errors.surveyDate
                    //     : "",
                  },
                }}
                name="interviewDate"
              />
            </Grid>
            {/* </Typography> */}
          </Grid>
        </Grid>
      </Box>
      {/* <Grid container justifyContent="flex-end">
        <Grid xs={3}></Grid>
      </Grid> */}
      <Divider />
    </Stack>
  );
};
