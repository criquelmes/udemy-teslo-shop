"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  const { subtotal, taxes, total, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummanyInfo())
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Validar si el carrito está vacío
  const isCartEmpty = cart.length === 0;

  const onPlaceOrder = async () => {
    // Validación adicional antes de procesar
    if (isCartEmpty) {
      setErrorMessage("No hay productos en el carrito");
      return;
    }
    setIsPlacingOrder(true);
    setErrorMessage(""); // Limpiar errores previos

    const productsToOrder = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
    }));

    // Simulate an API call to place the order
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Server Action
    const response = await placeOrder(productsToOrder, address);
    if (!response.ok) {
      // Handle error
      console.error("Failed to place order:", response.message);
      setIsPlacingOrder(false);
      setErrorMessage(
        response.error || "An error occurred while placing the order."
      );
      return;
    }
    //* todo salio bien
    clearCart();
    router.replace("/orders/" + response.order?.id);
  };

  if (!loaded) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-7">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Shipping address</h2>
      <div className="mb-10">
        <p className="font-bold">
          {address.firstName} {address.lastName}
        </p>
        <p>
          {address.address} {address.address2 ? ` - ${address.address2}` : ""}
        </p>
        <p>{address.city}</p>
        <p>{address.country}</p>
        <span className="font-bold">Zip Code: </span>{" "}
        <span>{address.postalCode}</span>
      </div>
      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
      <h2 className="text-2xl mb-2 font-bold">Order Summary</h2>
      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 item" : `${itemsInCart} items`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>

        <span>Taxes 19%</span>
        <span className="text-right">{currencyFormat(taxes)}</span>

        <span className="text-2xl mt-5">Total</span>
        <span className="text-right text-2xl mt-5">
          {currencyFormat(total)}
        </span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          By placing this order, you agree to our{" "}
          <Link className="underline" href="/terms">
            Terms and Conditions
          </Link>
          .
        </p>
        {/* Mostrar mensaje de error si el carrito está vacío */}
        {isCartEmpty && (
          <p className="text-red-500 mb-3">
            No hay productos en el carrito para procesar la orden.
          </p>
        )}

        <p className="text-red-500">{errorMessage}</p>

        <button
          onClick={onPlaceOrder}
          disabled={isPlacingOrder || isCartEmpty}
          className={clsx({
            "bg-black w-full text-white px-5 py-2 rounded mt-5 block text-center cursor-pointer":
              !isPlacingOrder && !isCartEmpty,
            "bg-gray-400 w-full text-white px-5 py-2 rounded mt-5 block text-center cursor-not-allowed":
              isPlacingOrder || isCartEmpty,
          })}
        >
          {isCartEmpty ? "Carrito vacío" : "Place order"}
        </button>
      </div>
    </div>
  );
};
