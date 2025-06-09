import { Title } from "@/components";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat } from "../../../../utils/currencyFormat";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  // llamar el serverr action getOrderById
  const { ok, order } = await getOrderById(id);
  console.log("order", order);
  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  // TODO: Verificar si el id es válido y obtener la orden desde la base de datos
  //Redirect
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${order?.id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-600": !order!.isPaid,
                  "bg-green-600": order!.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Payment pending</span> */}
              <span className="mx-2">
                {order?.isPaid ? "Payment successful" : "Payment pending"}
              </span>
            </div>

            {/* Items */}
            {order?.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: currencyFormat({item.price * item.quantity})
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Items */}

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Shipping address</h2>
            <div className="mb-10">
              <p className="font-bold">
                {address?.firstName} {address?.lastName}
              </p>
              <p>
                {address?.address}{" "}
                {address?.address2 ? ` - ${address?.address2}` : ""}
              </p>
              <p>{address?.city}</p>
              <p>{address?.countryId}</p>
              <span className="font-bold">Zip Code: </span>{" "}
              <span>{address?.postalCode}</span>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2 font-bold">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 item"
                  : `${order?.itemsInOrder} items`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subtotal)}
              </span>

              <span>Taxes 19%</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-right text-2xl mt-5">
                {currencyFormat(order!.total)}
              </span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-600": !order!.isPaid,
                    "bg-green-600": order!.isPaid,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Payment pending</span> */}
                <span className="mx-2">
                  {order?.isPaid ? "Payment successful" : "Payment pending"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
