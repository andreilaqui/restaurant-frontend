import React from 'react'
import { useCart } from '../../context/CartContext';

function MenuCard({ item }) {
  const { cart, setCart } = useCart();

  const addToCart = () => {
    const isExisting = cart.find( (cartItem) => cartItem.id === item.id);

    if (isExisting) {
      setCart( 
        cart.map( (cartItem) =>
        //look through cart, when you find the item, increase quantity by 1
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        ) 
      );
      return;
    } else {
      //item not in cart, add it with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }

      

  };

  return (
    <div className="
            bg-sunrice-cream
            rounded-xl p-4 
            shadow-[8px_8px_16px_#e0d9cf,-8px_-8px_16px_#ffffff] 
            hover:shadow-[inset_8px_8px_16px_#e0d9cf,inset_-8px_-8px_16px_#ffffff] 
            transition 
            dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20 
            dark:shadow-none
          ">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h3 className="font-semibold text-lg text-sunrice-brown dark:text-sunrice-yellow">{item.name}</h3>
      <p className="text-sm text-sunrice-brown/80 dark:text-sunrice-cream/90">{item.description}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {item.tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs 
             bg-sunrice-green text-sunrice-brown 
             dark:bg-sunrice-green/50 dark:text-sunrice-cream 
             px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-3 font-bold text-sunrice-yellow dark:text-sunrice-yellow">${item.price}</p>
      {item.availability ? (
        <button
          onClick={() => addToCart(item)}
          className="px-3 py-1 bg-sunrice-brown text-white rounded hover:bg-sunrice-yellow hover:text-sunrice-brown transition"
        >
          Add to Cart
        </button>
      ) : (
        <span className="text-red-500 font-semibold">Not Available</span>
      )}

    </div>
  );

}

export default MenuCard