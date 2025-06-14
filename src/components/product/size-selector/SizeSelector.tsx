import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeSelected?: (size: Size) => void;
}
export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeSelected,
}: Props) => {
  return (
    <div className="my-5 ">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex flex-wrap gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size === selectedSize,
            })}
            onClick={() => onSizeSelected?.(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
