import { Coupon } from "../../../types";

interface Props {
  coupon: Coupon;
  index: number;
}

export const CouponOption = ({ coupon, index }: Props) => {
  return (
    <option value={index}>
      {coupon.name} -{" "}
      {coupon.discountType === "amount"
        ? `${coupon.discountValue}원`
        : `${coupon.discountValue}%`}
    </option>
  );
};
