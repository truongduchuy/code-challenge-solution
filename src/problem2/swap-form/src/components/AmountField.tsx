import { Controller, type Control, type UseFormRegister } from "react-hook-form";
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
}

export default function AmountField({ control, formData, tokens, register, handleChangeCurrency, inputName, currencyName, readonly }: AmountFieldProps) {
  return (
    <div className="flex-1">
      <label htmlFor={inputName}>From Amount</label>
      <div className="relative">
        <Controller
          name={inputName}
          control={control}
          render={({ field: { onChange, value } }) => (
            <input
              className={`h-[65px] rounded-[12px] text-[18px] ${readonly ? "cursor-not-allowed" : ""}`}
              id={inputName}
              value={value || ""}
              onChange={onChange}
              readOnly={readonly}
            />
          )}
        />
        <div className="absolute right-[20px] top-1/2 -translate-y-1/2 flex items-center gap-2 border border-[lightgray] px-[6px] py-[4px] rounded-[8px]">
          <img
            className="w-5 h-5"
            src={`/tokens/${formData[currencyName]}.svg`}
            alt={formData[currencyName] as string || ""}
          />
          <select
            className="border-none outline-none bg-transparent h-[20px]"
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
        </div>
      </div>
    </div>
  );
}
