import type { TokenOption } from "../types";

export const calculateToAmount = (
  fromAmount: number | null,
  fromCurrency: string | null,
  toCurrency: string | null,
  tokens: TokenOption[]
) => {
  if (!fromCurrency || !toCurrency || !fromAmount) return "";
  const fromPrice =
    tokens?.find((t) => t.currency === fromCurrency)?.price ?? 0;
  const toPrice = tokens?.find((t) => t.currency === toCurrency)?.price ?? 0;
  const exchangeRate = fromPrice / toPrice;
  return (exchangeRate * (fromAmount || 0)).toFixed(4);
};
