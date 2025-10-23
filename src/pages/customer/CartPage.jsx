// 🔧 Core React
import React, { useEffect, useState } from "react";

// 🛠 Services
import { getCart, removeFromCart, checkout } from "../../services/orderService";

// 🧱 Components
import PageWrapper from "../../components/common/PageWrapper";

// 📄 Mock Data
import menuItems from "../../data/menuItems";


function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutSuccess, setCheckoutSuccess] = useState(null);

  // Load cart on mount
  useEffect(() => {
    getCart().then((data) => {
      setCart(data);
      setLoading(false);
    });
  }, []);

  const handleRemove = async (itemId) => {
    const updated = await removeFromCart(itemId);
    setCart(updated);
  };

  const handleCheckout = async () => {
    const order = await checkout();
    setCheckoutSuccess(order);
    setCart([]); // clear cart
  };

  // Helper map for menu items
  const menuMap = Object.fromEntries(menuItems.map(item => [item.id, item]));




  if (loading) return <PageWrapper title="Cart">Loading...</PageWrapper>;

  return (
    <PageWrapper title="Your Cart">
      {checkoutSuccess ? (
        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Order Confirmed!</h2>
          <p>Order #{checkoutSuccess.id} placed successfully.</p>
          <p className="mt-2">Total: ${checkoutSuccess.total}</p>
        </div>
      ) : cart.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => {
            const menuItem = menuMap[item.itemId];
            return (
              <div
                key={item.itemId}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  Item #{item.itemId} × {item.quantity}
                </span>
                <button
                  onClick={() => handleRemove(item.itemId)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            )
          })}

          <button
            onClick={handleCheckout}
            className="mt-4 px-4 py-2 bg-sunrice-brown text-white rounded hover:bg-sunrice-yellow hover:text-sunrice-brown transition"
          >
            Checkout
          </button>
        </div>
      )}
    </PageWrapper>
  );
}

export default CartPage;