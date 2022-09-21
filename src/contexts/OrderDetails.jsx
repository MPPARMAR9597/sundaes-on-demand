import { context } from "msw";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";

// Format Number As Currency

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

const OrderDetails = createContext();

// Create Custom Hook to check whether we're inside a provider

function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }
  return context;
}

function calculateSubTotal(optionType, optionCounts) {
  let optionCount = 0;

  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubTotal = calculateSubTotal("scoops", optionCounts);
    const toppingsSubTotal = calculateSubTotal("toppings", optionCounts);
    const grandTotal = scoopsSubTotal + toppingsSubTotal;
    setTotals({
      scoops: formatCurrency(scoopsSubTotal),
      toppings: formatCurrency(toppingsSubTotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      // Update Option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }

    // getter : Object Containing option count for scoops and topping, and subtotal and total
    // setter : update option count
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}

export { OrderDetailsProvider, useOrderDetails };
