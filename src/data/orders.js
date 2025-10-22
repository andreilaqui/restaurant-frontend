
const orders = [
  {
    id: 1,
    items: [
      { itemId: 6, quantity: 2 }, // Ube Fluff Pancakes
      { itemId: 18, quantity: 1 } // Barako Latte
    ],
    total: 36,
    status: "pending"
  },
  {
    id: 2,
    items: [
      { itemId: 1, quantity: 1 }, // Classic Tapsilog
      { itemId: 20, quantity: 2 } // Calamansi Iced Tea
    ],
    total: 27,
    status: "completed"
  }
];

export default orders;