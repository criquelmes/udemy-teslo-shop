"use client";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}
export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getStock(slug);
  }, [slug]);
  const getStock = async (slug: string) => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
  };
  return (
    <h1
      className={`${titleFont.className} antialiased font-extralight text-md`}
    >
      Stock: {stock}
    </h1>
  );
};
