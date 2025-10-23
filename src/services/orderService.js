import orders from "../data/orders";

let cart = [];

export function getOrders() {
  return Promise.resolve(orders);
}

export function getCart() {
  return Promise.resolve(cart);
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

export function removeFromCart(itemId) {
  cart = cart.filter(i => i.itemId !== itemId);
  return Promise.resolve(cart);
}

export function checkout() {
  const total = cart.reduce((sum, i) => sum + i.quantity * 10, 0); // placeholder pricing
  const newOrder = {
    id: orders.length + 1,
    items: [...cart],
    total,
    status: "pending",
  };
  orders.push(newOrder);
  cart = [];
  return Promise.resolve(newOrder);
}