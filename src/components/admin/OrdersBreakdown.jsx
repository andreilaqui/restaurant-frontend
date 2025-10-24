import React from "react";

function OrdersBreakdown({ completed, pending, cancelled }) {
  return (
    <section className="bg-white dark:bg-white/10 p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Orders Breakdown</h2>
      <ul className="space-y-2">
        <li>Completed: {completed}</li>
        <li>Pending: {pending}</li>
        <li>Cancelled: {cancelled}</li>
      </ul>
    </section>
  );
}

export default OrdersBreakdown;