"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export const PayPalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="animate-pulse gap-2 mb-10">
        <div className="h-12 bg-gray-300 rounded" />
        <div className="h-12 bg-gray-300 rounded mt-3" />
      </div>
    );
  }
  return <PayPalButtons />;
};
