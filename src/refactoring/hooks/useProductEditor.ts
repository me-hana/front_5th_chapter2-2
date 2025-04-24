import { useState } from "react";
import { Product, Discount } from "../../types";

export const useProductEditor = (
  products: Product[],
  onProductUpdate: (p: Product) => void,
) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  // 기존의 handleEditProduct
  const startEditing = (product: Product) => setEditingProduct({ ...product });

  // 기존의 handlePriceUpdate와 handleProductNameUpdate가 중복이 심해서 합함
  const updateField = (productId: string, field: keyof Product, value: any) => {
    if (editingProduct?.id === productId) {
      setEditingProduct({ ...editingProduct, [field]: value });
    }
  };

  // 기존의 handleStockUpdate
  const updateStock = (productId: string, stock: number) => {
    const found = products.find((p) => p.id === productId);
    if (found) {
      const updated = { ...found, stock };
      onProductUpdate(updated);
      setEditingProduct(updated);
    }
  };

  // 기존의 handleAddDiscount
  const addDiscount = (productId: string) => {
    const found = products.find((p) => p.id === productId);
    if (found && editingProduct) {
      const updated = {
        ...found,
        discounts: [...found.discounts, newDiscount],
      };
      onProductUpdate(updated);
      setEditingProduct(updated);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  // 기존의 handleRemoveDiscount
  const removeDiscount = (productId: string, index: number) => {
    const found = products.find((p) => p.id === productId);
    if (found) {
      const updated = {
        ...found,
        discounts: found.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(updated);
      setEditingProduct(updated);
    }
  };

  // 기존의 handleEditComplete
  const completeEdit = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  return {
    editingProduct,
    setEditingProduct,
    newDiscount,
    setNewDiscount,
    startEditing,
    updateField,
    updateStock,
    addDiscount,
    removeDiscount,
    completeEdit,
  };
};
