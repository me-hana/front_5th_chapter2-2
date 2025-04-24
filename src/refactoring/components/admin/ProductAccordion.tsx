import { Product, Discount } from "../../../types";
import { DiscountListItem } from "./DiscountListItem";

interface Props {
  product: Product;
  isOpen: boolean;
  isEditing: boolean;
  editingProduct: Product | null;
  newDiscount: Discount;
  onToggle: () => void;
  onEditClick: () => void;
  onFieldChange: (field: keyof Product, value: any) => void;
  onStockUpdate: (stock: number) => void;
  onDiscountRemove: (index: number) => void;
  onDiscountChange: (field: keyof Discount, value: number) => void;
  onDiscountAdd: () => void;
  onEditComplete: () => void;
}

export const ProductAccordion = ({
  product,
  isOpen,
  isEditing,
  editingProduct,
  newDiscount,
  onToggle,
  onEditClick,
  onFieldChange,
  onStockUpdate,
  onDiscountRemove,
  onDiscountChange,
  onDiscountAdd,
  onEditComplete,
}: Props) => {
  return (
    <div
      className="bg-white p-4 rounded shadow"
      data-testid={`product-${product.id}`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left font-semibold"
        data-testid="toggle-button"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {isOpen && (
        <div className="mt-2">
          {isEditing && editingProduct ? (
            <div>
              <div className="mb-4">
                <label className="block mb-1">상품명: </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => onFieldChange("name", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">가격: </label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    onFieldChange("price", parseInt(e.target.value))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">재고: </label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => onStockUpdate(parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                {editingProduct.discounts.map(
                  (discount: Discount, index: number) => (
                    <DiscountListItem
                      key={index}
                      discount={discount}
                      onRemove={() => onDiscountRemove(index)}
                    />
                  ),
                )}
                <div className="flex space-x-2 mt-2">
                  <input
                    type="number"
                    placeholder="수량"
                    value={newDiscount.quantity}
                    onChange={(e) =>
                      onDiscountChange("quantity", parseInt(e.target.value))
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="할인율 (%)"
                    value={newDiscount.rate * 100}
                    onChange={(e) =>
                      onDiscountChange("rate", parseInt(e.target.value) / 100)
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <button
                    onClick={onDiscountAdd}
                    className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    할인 추가
                  </button>
                </div>
              </div>

              <button
                onClick={onEditComplete}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
              >
                수정 완료
              </button>
            </div>
          ) : (
            <div>
              {product.discounts.map((discount: Discount, index: number) => (
                <DiscountListItem key={index} discount={discount} />
              ))}
              <button
                onClick={onEditClick}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                data-testid="modify-button"
              >
                수정
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
