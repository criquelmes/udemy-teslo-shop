"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import Link from "next/link";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) return <p>Loading...</p>;
  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            className="mr-5 rounded"
          />
          <div>
            <Link
              className="font-bold hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              <p>{product.title}</p>
            </Link>
            <p className="font-light text-s antialiased">
              Size: {product.size}
            </p>
            <p className="font-bold">${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantitySelected={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              className="hover:underline cursor-pointer text-xs font-light antialiased mt-3"
              onClick={() => removeProductFromCart(product)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
