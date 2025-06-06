import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  // Add methods to manipulate the cart if needed
  addProductToCart: (product: CartProduct) => void;

  // updaProductInCart
  // removeProductFromCart
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //Methods
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto ya existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Si el producto ya existe, actualizar la cantidad
        const updateProductsInCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity, // Incrementar la cantidad
            };
          }
          return item;
        });

        set({ cart: updateProductsInCart });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
