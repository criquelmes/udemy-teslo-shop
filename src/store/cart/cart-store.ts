import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;

  // Add products to cart
  addProductToCart: (product: CartProduct) => void;
  // Update product quantity in cart
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  // removeProductFromCart
  removeProductFromCart: (product: CartProduct) => void;
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
      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();
        // 1. Filtrar el producto que se quiere eliminar
        const updatedCartProducts = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );
        set({ cart: updatedCartProducts });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
