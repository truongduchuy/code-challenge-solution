## **CODE REVIEW & REFACTORING SUMMARY**

This document summarizes the issues found in `initial.ts` and how they were fixed in `refactor.ts`.

---

### 1.Missing blockchain Property in WalletBalance

Issue:
The WalletBalance type does not include the blockchain field, but the component expects it.

Original:
```
interface WalletBalance {
currency: string;
amount: number;
}
```

Fixed:
```
interface WalletBalance {
currency: string;
amount: number;
blockchain: string;
}
```

### 2. Broken Filtering Logic and Undefined Variable

Issue:

The variable lhsPriority is used but never declared.

The filter condition incorrectly keeps balances with zero or negative values while removing valid ones.

Original:
```
return balances.filter(balance => {
const balancePriority = getPriority(balance.blockchain);
if (lhsPriority > -99) {
if (balance.amount <= 0) {
return true;
}
}
return false;
});
```

Fixed:
```
const filteredBalances = balances.filter(balance => {
const priority = getPriority(balance.blockchain);
return priority > -99 && balance.amount > 0;
});
```

### 3. Incorrect useMemo Dependencies

Issue:
The useMemo hook includes prices as a dependency even though pricing does not affect the memoized computation.

Original:
```
}, [balances, prices]);
```

Fixed:
```
}, [balances]);
```

### 4. Redundant Mapping for formattedBalances

Issue:
formattedBalances is computed but never used. The code later maps again to produce formatted output.

Original:
```
const formattedBalances = sortedBalances.map(balance => ({
...balance,
formatted: balance.amount.toFixed()
}));
```

Fix:
Remove unused computation and add it on map row
```
const rows = sortedBalances.map((balance: WalletBalance) => {
    const formatted = balance.amount.toFixed(2);
    const usdValue = (prices[balance.currency] || 0) * balance.amount;

    return (
      <WalletRow
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formatted}
      />
    );
  });
```
### 5. Using Array Index as a React Key

Issue:
Index keys are unstable when data is sorted, which leads to rendering issues.

Original:
```
<WalletRow key={index} ... />
```

Fixed:
```
<WalletRow key={balance.currency} ... />
```
### 6. Sort Comparator Missing Default Return

Issue:
Sorting function does not return a value when priorities are equal, causing unstable ordering.

Original:
```
.sort((a, b) => {
if (priorityA > priorityB) return -1;
if (priorityB > priorityA) return 1;
});
```

Fixed:
```
.sort((a, b) => {
if (priorityA > priorityB) return -1;
if (priorityB > priorityA) return 1;
return 0;
});
```

### 7. getPriority Defined Inside Component

Issue:
The helper function is defined inside the component, meaning it is recreated every render. It also uses an any type.

Original:
```
const getPriority = (blockchain: any) => { ... }
```

Fixed (placed outside):
```
const getPriority = (blockchain: string): number => {
switch (blockchain) {
case "Osmosis": return 100;
case "Ethereum": return 50;
case "Arbitrum": return 30;
case "Zilliqa": return 20;
case "Neo": return 20;
default: return -99;
}
};
```

8. Unused Destructured Prop

Issue:
children is extracted, but never used.

Original:
const { children, ...rest } = props;

Fixed:
remove that line, add Omit to ignore children on props
```
interface Props extends Omit<BoxProps, "children">  {}

return <div {...props}>{rows}</div>;
```
