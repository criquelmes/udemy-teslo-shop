"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantitySelected?: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantitySelected }: Props) => {
  const handleQuantityChange = (value: number) => {
    if (quantity + value < 1) return;
    onQuantitySelected?.(quantity + value);
  };
  return (
    <div className="flex ">
      <button onClick={() => handleQuantityChange(-1)}>
        <IoRemoveCircleOutline className="text-2xl text-gray-500 hover:text-gray-700" />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {quantity}
      </span>
      <button onClick={() => handleQuantityChange(1)}>
        <IoAddCircleOutline className="text-2xl text-gray-500 hover:text-gray-700" />
      </button>
    </div>
  );
};
