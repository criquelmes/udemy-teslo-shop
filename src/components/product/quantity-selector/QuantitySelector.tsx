"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity);

  const handleQuantityChange = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
  };
  return (
    <div className="flex ">
      <button onClick={() => handleQuantityChange(-1)}>
        <IoRemoveCircleOutline className="text-2xl text-gray-500 hover:text-gray-700" />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {count}
      </span>
      <button onClick={() => handleQuantityChange(1)}>
        <IoAddCircleOutline className="text-2xl text-gray-500 hover:text-gray-700" />
      </button>
    </div>
  );
};
