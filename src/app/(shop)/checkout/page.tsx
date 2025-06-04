import Link from "next/link";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

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
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Items */}

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Shipping address</h2>
            <div className="mb-10">
              <p className="font-bold">Christopher Riquelme</p>
              <p>Pasaje San Pedro 1511</p>
              <p>Pichilemu</p>
              <p>Chile</p>
              <p>Zip Code: 282950</p>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2 font-bold">Order Summary</h2>
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
            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                {/* Disclaimer */}
                By placing this order, you agree to our{" "}
                <Link className="underline" href="/terms">
                  Terms and Conditions
                </Link>
                .
              </p>
              <Link
                href="/orders/123"
                className="bg-black text-white px-5 py-2 rounded mt-5 block text-center"
              >
                Place order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
