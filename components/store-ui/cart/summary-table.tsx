export const SummaryTable = ({ totalPrice, totalItems, clearCart, isSaving, items }: {
  totalPrice: number;
  totalItems: number;
  clearCart: () => void;
  isSaving: boolean;
  items: any;
}
) => {
  return (
    <div className="md:col-span-1 bg-gray-100 p-4 rounded h-fit">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Total Items:</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="font-bold">Subtotal:</span>
        <span className="font-bold">${totalPrice.toFixed(2)}</span>
      </div>
      <button
        onClick={clearCart}
        disabled={isSaving || items.length === 0}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50 mb-2"
      >
        Clear Cart
      </button>
      <button
        disabled={isSaving || items.length === 0}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        Proceed to Checkout
      </button>
    </div>)
}
