import * as yup from "yup";
import es from "yup-es";

yup.setLocale(es);

export default yup;

export const typeErrorMessage = "Seleccione una de las opciones sugeridas"