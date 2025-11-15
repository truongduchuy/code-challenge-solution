interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface Props extends BoxProps {}

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0;
      })
      .sort((a: WalletBalance, b: WalletBalance) => {
        const priorityA = getPriority(a.blockchain);
        const priorityB = getPriority(b.blockchain);

        if (priorityA > priorityB) return -1;
        if (priorityB > priorityA) return 1;
        return 0;
      });
  }, [balances]);

  const rows = sortedBalances.map((balance: WalletBalance) => {
    const formatted = balance.amount.toFixed(2);
    const price = prices[balance.currency] || 0;
    const usdValue = price * balance.amount;

    return (
      <WalletRow
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formatted}
      />
    );
  });

  return <div {...props}>{rows}</div>;
};
