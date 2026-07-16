import React from 'react';
import { useCartStore } from '@mfe/shared-store';
import { Button, Dropdown } from '@mfe/shared-ui';

export default function CartDropdown() {
  const { cartItems, clearCart, removeFromCart } = useCartStore();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    alert(`Checkout Completed Successfully!\nTotal Paid: $${totalPrice.toFixed(2)}`);
    clearCart();
  };

  return (
    <Dropdown
      menuClassName="w-72"
      label={
        <div className="flex items-center gap-2 relative">
          <span>🛒</span>
          <span className="hidden sm:inline font-medium text-sm">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-indigo-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </div>
      }
    >
      <div className="p-4 flex flex-col gap-3 text-zinc-800 dark:text-zinc-200">
        <h4 className="font-bold text-sm border-b border-zinc-200 dark:border-zinc-800 pb-2 flex justify-between items-center">
          <span>Shopping Cart</span>
          <span className="text-zinc-500 text-xs font-normal">({totalItems} items)</span>
        </h4>
        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-col gap-3 max-h-48 overflow-y-auto no-scrollbar">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={item.product.thumbnail}
                      alt=""
                      className="w-8 h-8 rounded bg-zinc-950 object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold truncate">{item.product.title}</span>
                      <span className="text-[10px] text-zinc-550 dark:text-zinc-500">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-indigo-500 dark:text-indigo-400">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-400 transition font-bold"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2 flex justify-between items-center font-bold text-sm">
              <span>Total Price:</span>
              <span className="text-indigo-500 dark:text-indigo-400">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="primary" className="flex-1 py-2 text-xs font-bold" onClick={handleCheckout}>
                Checkout
              </Button>
              <Button variant="secondary" className="py-2 px-3 text-xs" onClick={clearCart}>
                Clear
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-zinc-500 text-xs">Your cart is empty.</div>
        )}
      </div>
    </Dropdown>
  );
}
