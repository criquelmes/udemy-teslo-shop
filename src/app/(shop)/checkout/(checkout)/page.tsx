import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Checkout order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Review and pay</span>
            <Link className="underline mb-5" href="/">
              Go back to shop
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Items */}

          {/* Checkout */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
