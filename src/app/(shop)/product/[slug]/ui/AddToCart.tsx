"use client";

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}
export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };
  return (
    <>
      <div
        className={`
          overflow-hidden transition-all duration-400 ease-in-out
          ${
            posted && !size
              ? "max-h-6 opacity-100 mb-2"
              : "max-h-0 opacity-0 mb-0"
          }
        `}
      >
        <span className="text-red-600 font-light text-xs block">
          Please select a size
        </span>
      </div>
      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeSelected={setSize}
      />

      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} onQuantitySelected={setQuantity} />

      {/* Button */}
      <button className="btn-primary my-5 w-full rounded" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  );
};
