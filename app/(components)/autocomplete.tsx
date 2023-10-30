import {
  AutocompleteRenderInputParams,
  FormControl,
  FormHelperText,
  TextField as MuiTextField,
} from "@mui/material";
import { Field, useField } from "formik";
import { Autocomplete } from "formik-mui";
import { debounce } from "lodash";
import React from "react";

type AsyncAutocompleteProps<T, F> = {
  label: React.ReactNode;
  name: string;
  filter: (searchText: string) => Promise<T[]>;
  getLabel?: (option: any) => string;
};

// export const getTextParams = <T,>(
//   name: string,
//   touched: FormikTouched<T>,
//   errors: FormikErrors<T>
// ) => ();

// T is the response type, F is the form type
export const AsyncAutocomplete = <T, F>({
  label,
  name,
  filter,
  getLabel = (option) => option.name,
}: AsyncAutocompleteProps<T, F>) => {
  const [field, meta, helpers] = useField<F>(name);

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
      name={name}
      component={Autocomplete}
      freeSolo
      options={items}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <MuiTextField
          label={label}
          variant="outlined"
          {...params}
          name={name}
          error={meta.touched && !!meta.error}
          helperText={meta.error as string}
        />
      )}
      getOptionLabel={(option: any) =>
        typeof option === "string" ? option : getLabel(option)
      }
      filterOptions={(x: any) => x}
      onInputChange={(_event: any, newInputValue: any) => {
        if (!_event) {
          // is null when formik initialValues enableReinitialize works
          return;
        }

        searchItems(newInputValue);
        helpers.setValue(newInputValue);
      }}
    />
  );
};
