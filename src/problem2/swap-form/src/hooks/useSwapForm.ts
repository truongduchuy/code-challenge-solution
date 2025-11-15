import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validation";
import { calculateToAmount } from "../utils";
import type { FormValues } from "../components/SwapForm";
import useTokens from "./useTokens";

const useSwapForm = () => {
  const tokens = useTokens();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    register,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const formData = watch();
  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(
      `Swap process is successful!\n\nYou swapped ${formData.fromAmount} ${formData.fromCurrency} to ${formData.toAmount} ${formData.toCurrency}`
    );
    setValue("fromAmount", null);
    setValue("toAmount", null);
    setIsSubmitting(false);
  };

  const handleSwapCurrency = () => {
    const fromCurrency = formData.fromCurrency;
    const toCurrency = formData.toCurrency;
    setValue("fromCurrency", toCurrency || "");
    setValue(
      "toAmount",
      calculateToAmount(formData.fromAmount, toCurrency, fromCurrency, tokens)
    );
    setValue("toCurrency", fromCurrency || "");
  };

  const RateExchangeText = useMemo(() => {
    if (!formData.fromCurrency || !formData.toCurrency) return "";
    return `1 ${formData.fromCurrency} = ${calculateToAmount(
      1,
      formData.fromCurrency,
      formData.toCurrency,
      tokens
    )} ${formData.toCurrency}`;
  }, [formData.fromCurrency, formData.toCurrency, tokens]);

  const handleChangeCurrency = useCallback(
    (field: keyof FormValues, option: { currency: string }) => {
      setValue(field, option.currency);
    },
    [setValue]
  );

  useEffect(() => {
    const toAmount = calculateToAmount(
      formData.fromAmount,
      formData.fromCurrency,
      formData.toCurrency,
      tokens
    );
    setValue("toAmount", toAmount);
  }, [formData.fromAmount, formData.fromCurrency, formData.toCurrency, setValue, tokens]);

  return {
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
  };
};

export default useSwapForm;
