import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;

  // Add methods to manipulate the cart if needed
  addProductToCart: (product: CartProduct) => void;

  updateProductQuantity: (product: CartProduct, quantity: number) => void;

  // updaProductInCart
  // removeProductFromCart
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
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
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        // 1. Revisar si el producto ya existe en el carrito con la talla seleccionada
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: quantity, // Actualizar la cantidad
            };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
