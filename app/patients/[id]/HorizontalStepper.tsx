"use client";

import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Step = { path: string; label: string };

const steps = [
  { path: "selection", label: "Selección" },
  { path: "consent", label: "Consentimiento" },
  { path: "medical-history", label: "Anamnesis" },
  { path: "todo", label: "Farmacoterapia" },
  { path: "todo", label: "NES" },
  { path: "todo", label: "PICO" },
  { path: "todo", label: "SOAP" },
];

const getParent = (path: string) => {
  const pathSplit = path.split("/");
  pathSplit.pop();
  return pathSplit.join("/");
};

export function HorizontalStepper() {
  const router = useRouter();
  const pathname = usePathname();

  const currentRoute = pathname.split("/").pop();
  const activeStep: number = steps.findIndex((x) => x.path === currentRoute);

  const [completed] = React.useState<{
    [k: number]: boolean;
  }>({});

  const handleStep = (step: Step) => () => {
    router.push(getParent(pathname) + "/" + step.path);
  };

  return (
    <Box sx={{ width: "100%" }} py={4}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.path} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(step)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
