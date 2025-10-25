
import orders from "../data/orders";

// mock data
import menuItems from "../data/menuItems";
import cartItems from "../data/cartItems";


let cart = [];

export function getOrders() {
  return Promise.resolve(orders);
}

// Simulate fetching cart
export async function getCart() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cartItems), 300); // simulate delay
  });
}

// Simulate removing item
export async function removeFromCart(itemId) {
  return new Promise((resolve) => {
    const updated = cartItems.filter(item => item.itemId !== itemId);
    setTimeout(() => resolve(updated), 300);
  });
}

// Simulate checkout
export async function checkout() {
  const total = cartItems.reduce((sum, item) => {
    const menuItem = menuItems.find(m => m.id === item.itemId);
    return sum + (menuItem?.price || 0) * item.quantity;
  }, 0);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: Math.floor(Math.random() * 10000), total }), 500);
  });
}


export function addToCart(itemId, quantity = 1) {
  const existing = cart.find(i => i.itemId === itemId); //check if item already in cart
  if (existing) {
    existing.quantity += quantity;  //just increase quantity
  } else {
    cart.push({ itemId, quantity }); //add new item
  }
  return Promise.resolve(cart);
}

// Update quantity of a cart item
export async function updateCartItemQuantity(itemId, quantity) {
  // For mock data, just simulate update
  const cart = await getCart();
  const updated = cart.map(item =>
    item.itemId === itemId ? { ...item, quantity } : item
  );
  
  return updated.filter(item => item.quantity > 0);
}

