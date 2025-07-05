"use client";

import { useAuthApi } from "@/app/(api)/api";
import { Page } from "@/app/(api)/pagination";
import { Title } from "@/app/(components)/Title";
import { DiseaseCie10 } from "@/app/(portal)/cie10/DiseaseCie10";
import { minYear, today } from "@/app/date";
import {
  AutocompleteRenderInputParams,
  Box,
  Button,
  Chip,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  TextField as MuiTextField,
  Radio,
  Stack,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { blue } from "@mui/material/colors";
import { FastField, Field, Form, Formik, useFormikContext } from "formik";
import {
  Autocomplete,
  CheckboxWithLabel,
  RadioGroup,
  TextField,
} from "formik-mui";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import yup from "../../../../../validation";
import { CheckboxGroup } from "./CheckboxGroup";
import { ConsumptionHabits } from "./ConsumptionHabits";
import { LabTest, LabTests } from "./LabTests";
import { OutlinedPaper } from "./OutlinedPaper";
import { PersonalInformation } from "./PersonalInformation";
import { PhysicalExercises } from "./PhysicalExercises";
import { Subtitle } from "./Subtitle";
import { VitalFunctions } from "./VitalFunctions";
import {
  antecedents,
  foodConsumptions,
  foodHabits,
  healthProblems,
} from "./data";
import { requiredMessage } from "../../../../../(components)/helpers/requiredMessage";
import { SnackbarContext } from "@/app/(components)/SnackbarContext";
import InfoIcon from "@mui/icons-material/Info";
import { DatePicker } from "formik-mui-x-date-pickers";
import { FileDownload } from "@mui/icons-material";
import { CSVLink } from "react-csv";

const foodConsumptionsGroup1 = {
  ...foodConsumptions,
  items: foodConsumptions.items.slice(0, 4),
};

const foodConsumptionsGroup2 = {
  ...foodConsumptions,
  items: foodConsumptions.items.slice(4),
};

const initialValues: Anamnesis = {
  interviewDate: new Date(),
  occupation: "",
  sex: "",
  birthdate: null,
  weight: "",
  size: "",
  antecedents: [],
  otherAntecedents: "",

  healthProblems: {
    cardio: { items: [], additionalComments: "" },
    digestive: { items: [], additionalComments: "" },
    locomotive: { items: [], additionalComments: "" },
    snc: { items: [], additionalComments: "" },
    metabolic: { items: [], additionalComments: "" },
    skin: { items: [], additionalComments: "" },
    others: { items: [], additionalComments: "" },
  },

  vitalFunctions: {
    heartRate: "",
    breathingRate: "",
    temperature: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    additionalInformation: "",
  },

  consumptionHabits: {
    alcohol: "",
    tobacco: "",
    tea: "",
    water: "",
    others: "",
  },

  foodHabits: {
    salt: "",
    isSaltAddedToFood: "",
    foodClasses: [],
    others: "",
  },

  physicalExercises: "",
  existLabTests: null,
  labTests: [],
  diagnosis: [],
};

type HealthProblemsByCategory = {
  items: string[];
  additionalComments: string;
};

export type Anamnesis = {
  interviewDate: Date | null;
  occupation: string;
  sex: string;
  birthdate: Date | null;
  weight: number | string;
  size: number | string;
  antecedents: string[];
  otherAntecedents: string;

  healthProblems: {
    cardio: HealthProblemsByCategory;
    digestive: HealthProblemsByCategory;
    locomotive: HealthProblemsByCategory;
    snc: HealthProblemsByCategory;
    metabolic: HealthProblemsByCategory;
    skin: HealthProblemsByCategory;
    others: HealthProblemsByCategory;
  };

  vitalFunctions: {
    heartRate: number | string;
    breathingRate: number | string;
    temperature: number | string;
    bloodPressureSystolic: number | string;
    bloodPressureDiastolic: number | string;
    additionalInformation: string;
  };

  consumptionHabits: {
    alcohol: string;
    tobacco: string;
    tea: string;
    water: string;
    others: string;
  };

  foodHabits: {
    salt: string;
    isSaltAddedToFood: string;
    foodClasses: string[];
    others: string;
  };

  physicalExercises: string;
  existLabTests: boolean | null;
  labTests: LabTest[];
  diagnosis: string[];
};

export default function PatientInterview({
  params,
}: {
  params: { id: number };
}) {
  const { id: patientId } = params;
  const getApi = useAuthApi();
  const router = useRouter();
  const alert = React.useContext(SnackbarContext);

  const { data, mutate } = useSWR(`/patients/${patientId}/anamnesis`);

  const formInitialValues: Anamnesis = data
    ? {
      ...data,
      diagnosis: data.diseases,
    }
    : initialValues;

  const csvData = [
    {
      interviewDate: formInitialValues.interviewDate,
      occupation: formInitialValues.occupation,
      birthdate: formInitialValues.birthdate,
      weight: formInitialValues.weight,
      size: formInitialValues.size,
      sex: formInitialValues.sex,
    },
  ];

  return (
    <div>
      <Formik
        initialValues={formInitialValues}
        enableReinitialize
        validationSchema={yup.object({
          occupation: yup.string().required().label("La ocupación"),
          birthdate: yup
            .date()
            .required()
            .min(
              minYear,
              `La fecha de nacimiento no puede ser menor del año ${minYear.getFullYear()}`
            )
            .max(today)
            .label("Fecha de nacimiento")
            .typeError("Fecha de nacimiento inválida"),
          weight: yup.number().required().min(10).max(200).label("El peso"),
          size: yup.number().required().min(0.4).max(2.5).label("La talla"),
          sex: yup.string().required(requiredMessage),
          vitalFunctions: yup.object({
            heartRate: yup
              .number()
              .notRequired()
              .min(40)
              .max(250)
              .label("Frecuencia cardíaca"),
            breathingRate: yup
              .number()
              .notRequired()
              .min(8)
              .max(40)
              .label("Frecuencia respiratoria"),
            bloodPressureSystolic: yup
              .number()
              .notRequired()
              .min(60)
              .max(240)
              .label("PA sistólica"),
            bloodPressureDiastolic: yup
              .number()
              .notRequired()
              .min(30)
              .max(160)
              .label("PA diastólica"),
            temperature: yup
              .number()
              .notRequired()
              .min(34)
              .max(42)
              .label("Temperatura"),
          }),
          physicalExercises: yup.string().required().label("Ejercicio físico"),
          existLabTests: yup
            .string()
            .required("Escoja una de las dos opciones"),
          labTests: yup.array().of(
            yup.object({
              name: yup.string().required(requiredMessage),
              date: yup
                .date()
                .required(requiredMessage)
                .max(today)
                .typeError("Fecha inválida"),
              result: yup.string().required(requiredMessage),
              normalRange: yup.string().required(requiredMessage),
            })
          ),
          foodHabits: yup.object({
            salt: yup.string().required(requiredMessage),
            isSaltAddedToFood: yup.string().required(requiredMessage),
          }),
          consumptionHabits: yup.object({
            alcohol: yup.string().required(requiredMessage),
            tobacco: yup.string().required(requiredMessage),
            tea: yup.string().required(requiredMessage),
          }),
        })}
        onSubmit={async (values) => {
          const { diagnosis, labTests, ...rest } = values;
          const data = {
            ...rest,
            diseases: diagnosis, //diseaseIds: diagnosis.map((x) => x.id),
            labTests: labTests.map((x) => ({
              ...x,
              name: x.name,
            })),
          };

          const response = await getApi().then((api) =>
            api.post(`patients/${patientId}/anamnesis`, data)
          );

          mutate(response.data);
          alert.showMessage("Información guardada exitosamente");
          router.push(`/patients/${patientId}/pharmacotherapy`);
        }}
      >
        {() => (
          <Form>
            <Stack spacing={2} pt={2}>
              <div>
                <Title date={data?.createDate || new Date()}>
                  Ficha de anamnesis farmacológica
                  <CSVLink
                    data={csvData}
                    headers={[
                      { label: "Fecha de entrevista", key: "interviewDate" },
                      { label: "Ocupación", key: "occupation" },
                      { label: "Fecha de nacimiento", key: "birthdate" },
                      { label: "Peso", key: "weight" },
                      { label: "Tamaño", key: "size" },
                      { label: "Sexo", key: "sex" },
                    ]}
                    filename={`pacientes_${patientId}.csv`}
                  >
                    <Tooltip
                      title="Descargar CSV"
                      style={{ marginLeft: "10px" }}
                    >
                      {data && (
                        <Fab>
                          <FileDownload />
                        </Fab>
                      )}
                    </Tooltip>
                  </CSVLink>
                </Title>
              </div>
              <Grid container>
                <Grid xs={10}>
                  <Subtitle component="h4">1. Datos personales</Subtitle>
                </Grid>
              </Grid>
              <PersonalInformation />
              <Subtitle component="h4">2. Historia de salud</Subtitle>
              <Subtitle component="h5">2.1 Antecedentes patológicos</Subtitle>
              <PathologicalAntecedents />
              <Subtitle component="h5">2.2 Problemas de salud</Subtitle>
              <HealthProblems />
              <Subtitle component="h5">2.3 Funciones vitales</Subtitle>
              <VitalFunctions />
              <Subtitle component="h5">2.4 Hábitos de consumo</Subtitle>
              <ConsumptionHabits />
              <Subtitle component="h5">
                2.5 Hábitos alimenticios y/o dietéticos
              </Subtitle>
              <FoodHabits />
              <Subtitle component="h5">2.6 Ejercicios físicos*</Subtitle>
              <PhysicalExercises />
              <Subtitle component="h5">2.7 Pruebas de laboratorio*</Subtitle>
              <LabTests />
              <Subtitle component="h5">
                2.8 Diagnóstico
                <Tooltip
                  title="Para registrar una enfermedad
                que no se encuentra en la lista, primero debe
                escribirla y luego hacer click en enter"
                  placement="right"
                >
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Subtitle>
              <Diagnosis />
            </Stack>
            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ marginTop: "10px" }}
            >
              <Button variant="contained" type="submit">
                Guardar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const Diagnosis = () => {
  const { touched, errors, values } = useFormikContext<Anamnesis>();

  const getApi = useAuthApi();
  const [diseases, setDiseases] = React.useState<string[]>(values.diagnosis);

  const searchDiseases = debounce(async (newInputValue: string) => {
    if (newInputValue) {
      const api = await getApi();
      const page = await api
        .get<Page<DiseaseCie10>>(
          "/diseases/search/findByNameContainingIgnoringCase",
          {
            params: { searchText: newInputValue },
          }
        )
        .then((x) => x.data);
      setDiseases(page._embedded.diseases.map((x) => x.name));
    } else {
      setDiseases([]);
    }
  }, 500);

  const totalDiseases = [...values.diagnosis, ...diseases];

  // const getOptionLabel = (option: any) =>
  //   typeof option === "string" ? option : option.name;

  const getOptionLabel = (option: Option) => option;

  type Option = string; //{ id: number; }

  const name = "diagnosis";
  return (
    <Field
      name={name}
      multiple
      freeSolo
      component={Autocomplete}
      options={totalDiseases}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <MuiTextField
          placeholder="Ingrese una o varias enfermedades"
          variant="outlined"
          {...params}
          name={name}
          error={touched[name] && !!errors[name]}
          helperText={errors[name] as string}
        />
      )}
      // to solve bug with keys:
      // obtained from: https://stackoverflow.com/questions/75818761/material-ui-autocomplete-warning-a-props-object-containing-a-key-prop-is-be
      renderOption={(props: any, option: Option) => {
        return (
          <li {...props} key={option}>
            {getOptionLabel(option)}
          </li>
        );
      }}
      renderTags={(tagValue: Option[], getTagProps: any) => {
        return (
          <>
            {tagValue.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={getOptionLabel(option)}
              />
            ))}
          </>
        );
      }}
      // getOptionLabel={getOptionLabel}
      // isOptionEqualToValue={(option: DiseaseCie10, value: DiseaseCie10) =>
      //   option.id === value.id
      // }
      filterSelectedOptions
      filterOptions={(x: any) => x}
      onInputChange={(_event: any, newInputValue: any) => {
        searchDiseases(newInputValue);
      }}
    />
  );
};

const FoodHabits = () => {
  const { errors, touched } = useFormikContext<{
    foodHabits: { [key: string]: string };
  }>();

  return (
    <Grid container component={OutlinedPaper}>
      <Grid xs={3}>
        {foodHabits.map((group) => (
          <FormControl
            required
            error={Boolean(
              touched.foodHabits?.[group.id] && errors.foodHabits?.[group.id]
            )}
            key={group.id}
          >
            <Subtitle component="h6">{group.label}*</Subtitle>
            <FastField component={RadioGroup} name={"foodHabits." + group.id}>
              {group.items.map((item) => (
                <FormControlLabel
                  key={item.label}
                  value={item.name}
                  control={
                    <Radio
                      sx={{
                        color: blue[700],
                      }}
                    />
                  }
                  label={item.label}
                />
              ))}
            </FastField>
            <FormHelperText>
              {touched.foodHabits?.[group.id] && errors.foodHabits?.[group.id]}
            </FormHelperText>
          </FormControl>
        ))}
      </Grid>
      <CheckboxGroup group={foodConsumptionsGroup1} />
      <CheckboxGroup group={foodConsumptionsGroup2} />
      <Grid xs={3}>
        <FastField
          component={TextField}
          name="foodHabits.others"
          label="Otros:"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

const HealthProblems = () => (
  <Grid container component={OutlinedPaper} spacing={4}>
    {healthProblems.map((group, index) => (
      <CheckboxGroup key={index} group={{ ...group, id: group.id + ".items" }}>
        <FastField
          sx={{ my: 2 }}
          name={`${group.id}.additionalComments`}
          label="Comentarios adicionales"
          component={TextField}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />
      </CheckboxGroup>
    ))}
  </Grid>
);

const PathologicalAntecedents = () => (
  <Grid container component={OutlinedPaper}>
    <Grid xs={8} container>
      {antecedents.map((item) => (
        <Grid xs={4} key={item.name}>
          <FastField
            component={CheckboxWithLabel}
            type="checkbox"
            name="antecedents"
            value={item.name}
            Label={{ label: item.label }}
            sx={{
              color: blue[700],
            }}
          />
        </Grid>
      ))}
    </Grid>
    <Grid xs={4}>
      <FastField
        name="otherAntecedents"
        label="Otros:"
        component={TextField}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
      />
    </Grid>
  </Grid>
);
