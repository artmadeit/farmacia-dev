import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { formatDateTime } from "../date";
import { Field, useFormikContext } from "formik";
import { DateTimePicker } from "formik-mui-x-date-pickers";

type DateInterview = {
  interviewDate: any;
};

export const Title = ({
  children,
  date,
}: {
  children: React.ReactNode;
  date: Date;
}) => {
  const { touched, errors } = useFormikContext<DateInterview>();
  return (
    <Stack>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ paddingBottom: "10px" }}
      >
        <Typography variant="h5" gutterBottom>
          {children}
        </Typography>
        <Stack spacing={2}>
          <Typography>Fecha de registro: {formatDateTime(date)}</Typography>
          <Field
            component={DateTimePicker}
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
        </Stack>
      </Box>
      <Divider />
    </Stack>
  );
};
