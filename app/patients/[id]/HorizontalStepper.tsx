"use client";

import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import React from "react";

const steps = ["Selección", "Anamnesis", "Farmacoterapia"];

export function HorizontalStepper({
  children,
  activeStep: initialActiveStep,
}: {
  children: React.ReactNode;
  activeStep: number;
}) {
  const [activeStep, setActiveStep] = React.useState(initialActiveStep);
  const [completed] = React.useState<{
    [k: number]: boolean;
  }>({});

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box pt={4}>{children}</Box>
    </Box>
  );
}
