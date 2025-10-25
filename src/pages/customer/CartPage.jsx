// 🔧 Core React
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 🛠 Services
import { getCart, removeFromCart, checkout, updateCartItemQuantity } from "../../services/orderService";

// 🧱 Components
import PageWrapper from "../../components/common/PageWrapper";

// 📄 Mock Data
import menuItems from "../../data/menuItems";


function CartPage() {
  const [cart, setCart] = useState([]);                             // array for cart items
  const [loading, setLoading] = useState(true);                     // flag for loading state
  const [checkoutSuccess, setCheckoutSuccess] = useState(null);     // object for checkout success details

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
  const cartTotal = cart.reduce((sum, item) => {
    const menuItem = menuMap[item.itemId];
    return sum + (menuItem?.price || 0) * item.quantity;
  }, 0);


  if (loading) return <PageWrapper title="Cart">Loading...</PageWrapper>;




  return (
    <PageWrapper title="Your Cart">
      <div className="max-w-lg mx-auto p-4 bg-sunrice-yellow/50 dark:bg-gray-600 rounded-lg shadow">
        {checkoutSuccess ? (
          <div className="p-6 bg-sunrice-green dark:bg-sunrice-green/40 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Order Confirmed!</h2>
            <p>Order #{checkoutSuccess.id} placed successfully.</p>
            <p className="mt-2">Total: ${checkoutSuccess.total}</p>
          </div>
        ) : cart.length === 0 ? (
          <>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Your cart is empty.
            </p>
            <Link to="/menu" className="text-sunrice-brown underline hover:text-sunrice-yellow">
              Browse Menu →
            </Link>
          </>
        ) : (
          < div className="space-y-4">
            {cart.map((item) => {
              const menuItem = menuMap[item.itemId];
              return (
                <div
                  key={item.itemId}
                  className="grid grid-cols-4 items-center border-b pb-2 gap-2"
                >
                  <span className="font-medium text-sunrice-brown dark:text-sunrice-yellow">
                    {menuItem.name}
                  </span>

                  {/* Quantity controls */}
                  <div className="flex items-center space-x-2 justify-center">
                    <button
                      onClick={async () => {
                        const updated = await updateCartItemQuantity(item.itemId, item.quantity - 1);
                        setCart(updated);
                      }}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={async () => {
                        const updated = await updateCartItemQuantity(item.itemId, item.quantity + 1);
                        setCart(updated);
                      }}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    ${menuItem.price.toFixed(2)} each
                  </span>

                  <button
                    onClick={() => handleRemove(item.itemId)}
                    className="text-red-500 hover:underline text-right"
                  >
                    Remove
                  </button>
                </div>


              );
            })}


            <p className="text-right font-bold text-lg mt-4">
              Total: ${cartTotal.toFixed(2)}
            </p>

            <button
              onClick={handleCheckout}
              className="mt-4 px-4 py-2 bg-sunrice-brown text-white rounded hover:bg-sunrice-yellow hover:text-sunrice-brown transition"
            >
              Checkout
            </button>
          </div>
        )
        }
      </div>
    </PageWrapper >
  );
}

export default CartPage;