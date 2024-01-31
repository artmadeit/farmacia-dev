"use client";

import { TextField } from "formik-mui";
import PharmaceuticalProductForm from "../pharmaceuticalProductForm";

const CreatePharmaceuticalProduct = () => {
  return (
    <PharmaceuticalProductForm
      textName="Registrar"
      pharmaceuticalProduct={{
        name: "",
        concentration: "",
        form: "",
      }}
    />
  );
};

export default CreatePharmaceuticalProduct;
