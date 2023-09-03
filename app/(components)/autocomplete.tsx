import React from "react";
import {
  AutocompleteRenderInputParams,
  TextField as MuiTextField,
} from "@mui/material";
import { Field, useFormikContext, FormikTouched, FormikErrors } from "formik";
import { debounce } from "lodash";
import { Autocomplete } from "formik-mui";

type AsyncAutocompleteProps<T, F> = {
  label: React.ReactNode;
  field: keyof F;
  filter: (searchText: string) => Promise<T[]>;
  getLabel?: (option: any) => string;
};

export const getTextParams = <T,>(
  name: keyof T,
  touched: FormikTouched<T>,
  errors: FormikErrors<T>
) => ({
  name: name as string,
  error: touched[name] && !!errors[name],
  helperText: errors[name] as string,
});

// T is the response type, F is the form type
export const AsyncAutocomplete = <T, F>({
  label,
  field,
  filter,
  getLabel = (option) => option.name,
}: AsyncAutocompleteProps<T, F>) => {
  const { setFieldValue, touched, errors } = useFormikContext<F>();

  const [items, setItems] = React.useState<T[]>([]);
  const searchItems = debounce(async (newInputValue: string) => {
    if (newInputValue) {
      const data = await filter(newInputValue);
      setItems(data);
    } else {
      setItems([]);
    }
  }, 500);

  return (
    <Field
      name={field}
      component={Autocomplete}
      freeSolo
      options={items}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <MuiTextField
          label={label}
          variant="outlined"
          {...params}
          {...getTextParams(field, touched, errors)}
        />
      )}
      getOptionLabel={(option: any) =>
        typeof option === "string" ? option : getLabel(option)
      }
      filterOptions={(x: any) => x}
      onInputChange={(_event: any, newInputValue: any) => {
        searchItems(newInputValue);
        setFieldValue(field as string, newInputValue);
      }}
    />
  );
};
