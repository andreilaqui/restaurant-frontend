import React from "react";

function KpiCards({ totalOrders, totalRevenue, timeRangeLabel }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="p-4 bg-white dark:bg-white/10 rounded-lg shadow">
        <h3 className="text-sm text-gray-500">Total Orders</h3>
        <p className="text-2xl font-bold">{totalOrders}</p>
      </div>
      <div className="p-4 bg-white dark:bg-white/10 rounded-lg shadow">
        <h3 className="text-sm text-gray-500">Revenue</h3>
        <p className="text-2xl font-bold">${totalRevenue}</p>
      </div>
      <div className="p-4 bg-white dark:bg-white/10 rounded-lg shadow">
        <h3 className="text-sm text-gray-500">Selected Range</h3>
        <p className="text-lg">{timeRangeLabel}</p>
      </div>
    </div>
  );
}

export default KpiCards;