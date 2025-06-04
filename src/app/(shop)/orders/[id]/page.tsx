import Link from "next/link";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline, IoCartOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  // TODO: Verificar si el id es válido y obtener la orden desde la base de datos
  //Redirect
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-600": false,
                  "bg-green-600": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Payment pending</span> */}
              <span className="mx-2">Payment successful</span>
            </div>

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
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-600": false,
                    "bg-green-600": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Payment pending</span> */}
                <span className="mx-2">Payment successful</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
