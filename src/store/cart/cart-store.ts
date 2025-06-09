import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummanyInfo: () => {
    subtotal: number;
    taxes: number;
    total: number;
    itemsInCart: number;
  };

  // Add products to cart
  addProductToCart: (product: CartProduct) => void;
  // Update product quantity in cart
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  // removeProductFromCart
  removeProductFromCart: (product: CartProduct) => void;
  // Clear the cart
  clearCart: () => void;
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
      getSummanyInfo: () => {
        const { cart } = get();
        const subtotal = cart.reduce(
          (subtotal, product) => product.quantity * product.price + subtotal,
          0
        );
        const taxes = subtotal * 0.19; // 19% de impuestos
        const total = subtotal + taxes;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subtotal,
          taxes,
          total,
          itemsInCart,
        };
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

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
