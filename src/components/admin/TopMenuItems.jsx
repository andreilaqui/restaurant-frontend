import React from "react";

function TopMenuItems({ items }) {
  return (
    <section className="bg-white dark:bg-white/10 p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Top Menu Items</h2>
      <ul className="divide-y">
        {items.map(item => (
          <li key={item.id} className="py-2 flex justify-between">
            <span>{item.name}</span>
            <span>{item.orders} orders</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TopMenuItems;