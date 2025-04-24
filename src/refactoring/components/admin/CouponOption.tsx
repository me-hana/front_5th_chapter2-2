import { Coupon } from "../../../types";

interface Props {
  coupon: Coupon;
}

export const CouponOption = ({ coupon }: Props) => {
  return (
    <div className="bg-gray-100 p-2 rounded">
      {coupon.name} ({coupon.code}):{" "}
      {coupon.discountType === "amount"
        ? `${coupon.discountValue}원`
        : `${coupon.discountValue}%`}{" "}
      할인
    </div>
  );
};
