"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  //   useCartStore((state) => state.getSummanyInfo); // Ensure the function is called to trigger reactivity
  //   const summaryInfo = useCartStore((state) => state.getSummanyInfo);

  //   const { subtotal, taxes, total, itemsInCart } = summaryInfo();

  const { subtotal, taxes, total, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummanyInfo())
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;
  return (
    <>
      <span>No. Products</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 item" : `${itemsInCart} items`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subtotal)}</span>

      <span>Taxes 19%</span>
      <span className="text-right">{currencyFormat(taxes)}</span>

      <span className="text-2xl mt-5">Total</span>
      <span className="text-right text-2xl mt-5">{currencyFormat(total)}</span>
    </>
  );
};
