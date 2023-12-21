import {
  AutocompleteRenderInputParams,
  TextField as MuiTextField,
} from "@mui/material";
import { Field, useField } from "formik";
import { Autocomplete } from "formik-mui";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";

type AsyncAutocompleteProps<T, F> = {
  label: React.ReactNode;
  name: string;
  filter: (searchText: string) => Promise<T[]>;
  getLabel?: (option: any) => string;
  disabled?: boolean;
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
  disabled = false,
}: AsyncAutocompleteProps<T, F>) => {
  const textRef = useRef<HTMLInputElement>();
  const [field, meta, helpers] = useField<F | null>(name);

  const [items, setItems] = React.useState<T[]>([]);
  const [key, setKey] = useState(new Date());

  useEffect(() => {
    // trick of clear value (https://stackoverflow.com/questions/59790956/material-ui-autocomplete-clear-value)
    if (disabled) {
      helpers.setValue(null);
      setItems([]);
      setKey(new Date());
    }
  }, [disabled, helpers]);

  const searchItems = debounce(async (newInputValue: string) => {
    if (newInputValue) {
      const data = await filter(newInputValue);
      setItems(data);
    } else {
      setItems([]);
    }
  }, 500);

  const getOptionLabel = (option: any) =>
    typeof option === "string" ? option : getLabel(option);

  return (
    <Field
      key={key}
      disabled={disabled}
      name={name}
      component={Autocomplete}
      freeSolo
      options={items}
      renderInput={(params: AutocompleteRenderInputParams) => {
        return (
          <MuiTextField
            label={label}
            variant="outlined"
            {...params}
            inputRef={textRef}
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched ? meta.error : ""}
          />
        );
      }}
      renderOption={(props: any, option: any) => {
        return (
          <li {...props} key={option.id}>
            {getOptionLabel(option)}
          </li>
        );
      }}
      getOptionLabel={getOptionLabel}
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
