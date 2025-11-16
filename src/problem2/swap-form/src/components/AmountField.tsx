import {
  Controller,
  useController,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import type { FormValues } from "./SwapForm";
import type { TokenOption } from "../types";

interface AmountFieldProps {
  control: Control<FormValues>;
  formData: FormValues;
  tokens: TokenOption[];
  register: UseFormRegister<FormValues>;
  handleChangeCurrency: (field: keyof FormValues, option: TokenOption) => void;
  inputName: keyof FormValues;
  currencyName: keyof FormValues;
  readonly?: boolean;
  label: string;
}

export default function AmountField({
  control,
  formData,
  tokens,
  register,
  handleChangeCurrency,
  inputName,
  currencyName,
  readonly,
  label,
}: AmountFieldProps) {
  const { fieldState } = useController({
    name: inputName,
    control,
  });
  return (
    <div className="flex-1">
      <label htmlFor={inputName}>{label}</label>
      <div className="relative">
        <Controller
          name={inputName}
          control={control}
          render={({ field: { onChange, value } }) => (
            <input
              type="number"
              className={`h-[50px] rounded-[12px] text-[18px] ${
                readonly ? "cursor-not-allowed" : ""
              }`}
              id={inputName}
              value={value || ''}
              onChange={onChange}
              readOnly={readonly}
            />
          )}
        />
        <div className="absolute right-[20px] top-1/2 -translate-y-1/2 flex items-center gap-2 border border-[lightgray] px-[6px] py-[4px] rounded-[8px] pointer-events-none">
          <img
            className="w-5 h-5"
            src={`/tokens/${formData[currencyName]}.svg`}
            alt={(formData[currencyName] as string) || ""}
          />
          <select
            className="absolute inset-0 opacity-0 cursor-pointer pointer-events-auto w-full"
            id="currency"
            {...register(currencyName)}
            onChange={(e) =>
              handleChangeCurrency(currencyName, {
                currency: e.target.value,
              } as TokenOption)
            }
          >
            <option value="">Currency</option>
            {tokens.map((token) => (
              <option key={token.currency} value={token.currency}>
                {token.currency}
              </option>
            ))}
          </select>
          <span className="text-sm text-[black] ml-[6px]">
            {formData[currencyName] || "Currency"}
          </span>
        </div>
      </div>
      {fieldState.error && (
        <p className="text-[red] text-sm mt-1">{fieldState.error.message}</p>
      )}
    </div>
  );
}
