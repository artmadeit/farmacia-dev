"use client";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { blue } from "@mui/material/colors";
import { FastField } from "formik";
import { CheckboxWithLabel } from "formik-mui";
import React from "react";
import { GroupItems } from "./data";
import { Subtitle } from "./Subtitle";

export const CheckboxGroup = ({
  group,
  children,
}: {
  group: GroupItems;
  children?: React.ReactNode;
}) => {
  return (
    <Grid xs={3}>
      <Subtitle component="h6">{group.label}</Subtitle>
      <Stack>
        {group.items.map((item, idx) => (
          <FastField
            key={idx}
            component={CheckboxWithLabel}
            type="checkbox"
            name={group.id}
            value={item.name}
            Label={{ label: item.label }}
            sx={{
              color: blue[700],
            }}
          />
        ))}
        {children}
      </Stack>
    </Grid>
  );
};
