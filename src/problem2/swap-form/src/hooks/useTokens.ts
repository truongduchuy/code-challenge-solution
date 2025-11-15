import { useEffect, useState } from "react";
import type { Token, TokenOption } from "../types";

const TOKEN_API_URL = "https://interview.switcheo.com/prices.json";
const useTokens = (): TokenOption[] => {
  const [tokens, setTokens] = useState<TokenOption[]>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      const responseJson = await fetch(TOKEN_API_URL);
      const data: Token[] = await responseJson.json();

      // Keep only the latest occurrence per currency
      const lastSeen = new Map<string, Token>();

      for (const item of data) {
        lastSeen.set(item.currency, item);
      }

      const latestOnlyData = Array.from(lastSeen.values());

      setTokens(
        latestOnlyData.map((token: Token) => ({
          ...token,
          value: token.currency,
          label: token.currency,
        }))
      );
    };
    fetchTokens();
  }, []);
  return tokens;
};

export default useTokens;
