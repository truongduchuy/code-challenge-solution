import * as yup from "yup";

export const schema = yup.object().shape({
  fromAmount: yup
    .number()
    .typeError("From value must be a number")
    .required("From value is required")
    .test("is-decimal", "Invalid decimal - max 3 decimal places", (value) => {
      const regex = /^\d+(\.\d{1,3})?$/;
      return regex.test(value + "");
    })
    .nullable(),
  toAmount: yup.string().nullable(),
  fromCurrency: yup.string().required("From Currency is required").nullable(),
  toCurrency: yup.string().required("To Currency is required").nullable(),
});
