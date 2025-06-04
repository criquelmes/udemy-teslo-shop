import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={100} className="text-gray-400 mx-5" />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600">
          Start shopping to add items to your cart.
        </p>
        <p className="text-gray-600">
          Browse our products and find what you love!
        </p>
        <Link href="/" className="text-blue-500 font-bold mt-2">
          Go to Shop
        </Link>
      </div>
    </div>
  );
}
