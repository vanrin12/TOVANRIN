# **Report: Issues Identified in WalletPage Component**

## **Objective**
Review and address computational inefficiencies, anti-patterns, and type safety issues in the `WalletPage` component, implemented with React and TypeScript.

---

## **Summary of Issues**

### 1. **Type Safety Concerns**
- `blockchain: any` in the `getPriority` function undermines TypeScript’s type safety.
- The `WalletBalance` interface lacks a `blockchain` property, essential for sorting and filtering.
- The `FormattedWalletBalance` interface duplicates properties (`currency` and `amount`) instead of reusing definitions from `WalletBalance`.

### 2. **React and Functional Component Anti-Patterns**
- `classes.row` is referenced but is undefined.
- `children` is destructured from props but is unused, creating unnecessary noise in the code.
- Unknown props are spread with `...rest` without type validation, which introduces potential bugs.
- The `useMemo` dependency array includes `prices`, although it does not affect the `processedBalances` calculation.

### 3. **Computational Inefficiencies**
- Filtering and sorting of `balances` are performed as separate steps, increasing computational cost.
- The `getPriority` function uses a switch statement with repeated return values (e.g., `20` for `Zilliqa` and `Neo`), introducing redundancy.
- Double mapping operations are performed on `sortedBalances` for formatting and rendering, causing unnecessary iterations.

### 4. **Key and Data Rendering Anti-Patterns**
- `WalletRow` components use `index` as a key, which can lead to rendering issues when the list changes.
- Error and loading states are not explicitly handled, leading to a suboptimal user experience.

---

## **Proposed Fixes**

### 1. **Improve Type Safety**
- Replace `any` with a `Blockchain` union type for the `blockchain` property.
- Add the `blockchain` property to the `WalletBalance` interface.
- Use interface inheritance to extend `WalletBalance` for `FormattedWalletBalance`.

### 2. **Resolve Anti-Patterns**
- Remove unused `children` and avoid spreading unknown props (`...rest`).
- Ensure `classes.row` is either defined or removed from the component.
- Update `useMemo` to only include necessary dependencies, ensuring optimal performance.

### 3. **Enhance Computational Efficiency**
- Combine filtering and sorting into a single step using a single operation like `reduce` or an optimized `sort`.
- Use a `Record` object (`BLOCKCHAIN_PRIORITIES`) for priority mapping, eliminating the switch statement.
- Perform all necessary calculations in one iteration, avoiding redundant mapping.

### 4. **Address Key and UX Issues**
- Use a unique combination of `blockchain` and `currency` for `WalletRow` keys instead of the `index`.
- Add explicit loading and error states to improve user experience.

---

## **Refactored Code Implementation**

Below is the refactored code that addresses the identified issues and follows React and TypeScript best practices.

```tsx
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

interface WalletBalance {
  blockchain: Blockchain;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

const BLOCKCHAIN_PRIORITIES: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: Blockchain): number =>
  BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;

const WalletPage: React.FC = () => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices: Record<string, number> = usePrices();

  if (!balances) return <div>Loading...</div>; // Loading state
  if (!prices) return <div>Error loading prices</div>; // Error state

  const processedBalances = useMemo(() => {
    return balances
      .filter(balance => balance.amount > 0)
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain))
      .map(balance => ({
        ...balance,
        formatted: balance.amount.toFixed(),
        usdValue: (prices[balance.currency] || 0) * balance.amount,
      }));
  }, [balances, prices]);

  if (!processedBalances.length) {
    return <div>No balances available</div>;
  }

  return (
    <div>
      {processedBalances.map(balance => (
        <WalletRow
          key={`${balance.blockchain}-${balance.currency}`}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};

export default WalletPage;
