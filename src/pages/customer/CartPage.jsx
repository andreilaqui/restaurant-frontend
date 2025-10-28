// 🔧 Core React
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 🛠 Services
import { useCart } from "../../context/CartContext";

// 🧱 Components
import PageWrapper from "../../components/common/PageWrapper";

// 📄 Mock Data
import menuItems from "../../data/menuItems";


function CartPage() {
  const { cart, setCart } = useCart();                             // array for cart items
  const [checkedOut, setCheckedOut] = useState(false);                  // flag for checkout status
  const [orderType, setOrderType] = useState("");             // order type: pickup or delivery


  //const [loading, setLoading] = useState(true);                     // flag for loading state
  //const [checkoutSuccess, setCheckoutSuccess] = useState(null);     // object for checkout success details

  // Load cart on mount
  // useEffect(() => {
  //   getCart().then((data) => {
  //     setCart(data);
  //     setLoading(false);
  //   });
  // }, []);

  const handleRemove = async (itemId) => {
    // const updated = await removeFromCart(itemId);
    // setCart(updated);
    setCart(cart.filter(item => item.id !== itemId));
  };

  // const handleCheckout = async () => {
  //   const order = await checkout();
  //   setCheckoutSuccess(order);
  //   setCart([]); // clear cart
  // };


  // Helper map for menu items
  //const menuMap = Object.fromEntries(menuItems.map(item => [item.id, item]));

  const cartTotal = cart.reduce((sum, item) => { return sum + item.price * item.quantity }, 0);


  //if (loading) return <PageWrapper title="Cart">Loading...</PageWrapper>;

  const successMessage = (orderType) => {
    if (orderType === "pickup") {
      return (<>Order ready for <span className="font-extrabold text-lg"> pickup</span>!</>);
    } else {
      return (<>Order for <span className="font-extrabold text-lg"> delivery</span> placed successfully!</>);
    }
  };

  return (
    <PageWrapper title="Your Cart">
      <div className="max-w-2xl mx-auto p-4 bg-sunrice-yellow/50 dark:bg-gray-600 rounded-lg shadow">
        {cart.length === 0 ? (
          // Empty cart
          checkedOut ? (
            <p className="text-center text-green-600 font-semibold">
              {successMessage(orderType)}
            </p>

          ) : (
            <>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Your cart is empty.
              </p>
              <Link
                to="/menu"
                className="text-sunrice-brown underline hover:text-sunrice-yellow"
              >
                Browse Menu →
              </Link>
            </>
          )

        ) : (
          // Cart with items
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 items-center border-b pb-2 gap-2"
              >
                {/* Item name */}
                <span className="font-medium text-sunrice-brown dark:text-sunrice-yellow">
                  {item.name}
                </span>

                {/* Quantity controls it will look like   - n +  */}
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() =>
                      setCart(
                        cart.map((i) =>
                          i.id === item.id && i.quantity > 1
                            ? { ...i, quantity: i.quantity - 1 } //go through each item until it sees id, then decrease quantity by 1
                            : i
                        )
                      )
                    }
                    className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    disabled={item.quantity <= 1} //disable if 1, let remove button handle it
                  >
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      setCart(
                        cart.map((i) =>
                          i.id === item.id
                            ? { ...i, quantity: i.quantity + 1 }  //go through each item until it sees id, then increase quantity by 1
                            : i
                        )
                      )
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>


                {/* Per item price */}
                <span className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  ${item.price.toFixed(2)} each
                </span>

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:underline text-right"
                >
                  Remove
                </button>
              </div>
            ))}


            {/* Cart total */}
            <p className="text-right font-bold text-lg mt-4">
              Total: ${cartTotal.toFixed(2)}
            </p>

            {/* Order type selection */}
            <div className="mt-4 flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="orderType"
                  value="pickup"
                  checked={orderType === "pickup"}
                  onChange={() => setOrderType("pickup")}
                />
                <span>Pickup</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="orderType"
                  value="delivery"
                  checked={orderType === "delivery"}
                  onChange={() => setOrderType("delivery")}
                />
                <span>Delivery</span>
              </label>
            </div>


            {/* Checkout button */}
            <button
              onClick={() => {
                setCart([]);
                setCheckedOut(true);
                alert(`Order placed for ${orderType}!`);  //send orderType to backend
              }}   //clears the cart
              disabled={!orderType}   // disables if no choice
              className={`mt-4 px-4 py-2 rounded transition
                ${orderType ? `bg-sunrice-brown text-white  hover:bg-sunrice-yellow hover:text-sunrice-brown`
                  : `bg-gray-300 text-gray-500 cursor-not-allowed`
                } `}
            >
              Checkout
            </button>

          </div>
        )}
      </div>
    </PageWrapper>
  );

}

export default CartPage;