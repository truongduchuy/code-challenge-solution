import React from "react";
import * as yup from "yup";
import { SubmitButton } from "./SubmitButton";
import { schema } from "../validation";
import SwapCurrencyIcon from "./SwapCurrencyIcon";
import AmountField from "./AmountField";
import useSwapForm from "../hooks/useSwapForm";

export type FormValues = yup.InferType<typeof schema>;

const SwapForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    register,
    onSubmit,
    handleSwapCurrency,
    RateExchangeText,
    handleChangeCurrency,
    formData,
    isSubmitting,
    tokens,
  } = useSwapForm();
  return (
    <section className="fancy-form-section">
      <h2>Swap form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div className="flex gap-4 w-full">
            <AmountField
              control={control}
              formData={formData}
              tokens={tokens}
              register={register}
              handleChangeCurrency={handleChangeCurrency}
              inputName="fromAmount"
              currencyName="fromCurrency"
              label="From Amount"
            />
          </div>
          <SwapCurrencyIcon handleSwapCurrency={handleSwapCurrency} />
          <div className="flex gap-4 w-full">
            <AmountField
              control={control}
              formData={formData}
              tokens={tokens}
              register={register}
              handleChangeCurrency={handleChangeCurrency}
              inputName="toAmount"
              currencyName="toCurrency"
              readonly
              label="To Amount"
            />
          </div>
        </fieldset>
        <div className="mx-3 text-center">{RateExchangeText}</div>
        <div className="actions mt-[20px]">
          <SubmitButton
            isSubmitting={isSubmitting}
            disabled={
              isSubmitting ||
              !formData.fromAmount ||
              !formData.fromCurrency ||
              !formData.toCurrency
            }
          />
        </div>
      </form>
    </section>
  );
};

export default SwapForm;
