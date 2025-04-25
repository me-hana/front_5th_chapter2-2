import { Discount } from "../../../types";
import { formatDiscount } from "../../utils/format";

interface Props {
  discount: Discount;
  onRemove?: () => void;
}

export const DiscountListItem = ({ discount, onRemove }: Props) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <span>{formatDiscount(discount.quantity, discount.rate)}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          삭제
        </button>
      )}
    </div>
  );
};
