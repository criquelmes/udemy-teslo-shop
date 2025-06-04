import Link from "next/link";
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {
  // redirect("/empty");
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add items</span>
            <Link className="underline mb-5" href="/">
              Go to shop
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
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
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={3} />
                  <button className="underline mt-3">Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Items */}

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Checkout</h2>
            <div className="grid grid-cols-2">
              <span># Products</span>
              <span className="text-right">3 items</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Taxes 19%</span>
              <span className="text-right">$119</span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-right text-2xl mt-5">$119</span>
            </div>
            <div>
              <Link
                href="/checkout"
                className="bg-black text-white px-5 py-2 rounded mt-5 block text-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
