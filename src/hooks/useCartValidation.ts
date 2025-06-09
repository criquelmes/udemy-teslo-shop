import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store";

export const useCartValidation = (redirectTo: string = "/cart") => {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const isEmpty = cart.length === 0;

  useEffect(() => {
    if (isEmpty) {
      router.replace(redirectTo);
    }
  }, [isEmpty, router, redirectTo]);

  return { isEmpty, cart };
};
