import React, { useState } from "react";

function AdminOrderList({ orders, viewMode, onStatusChange }) {
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpanded = (orderId) => {
    setExpandedIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Use viewMode here to decide how many orders to show
  const visibleOrders = viewMode === "compact" ? orders.slice(0, 3) : orders;

  return (
    <div>
      {/* Indicator */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {viewMode === "compact"
          ? `Showing ${visibleOrders.length} of ${orders.length} orders`
          : `Showing all ${orders.length} orders`}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleOrders.map(order => (
          <OrderRow
            key={order._id}
            order={order}
            expanded={expandedIds.includes(order._id)}
            onToggle={() => toggleExpanded(order._id)}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}


function OrderRow({ order, expanded, onToggle, onStatusChange }) {
  const badgeColor = {
    pending: "bg-yellow-100 text-yellow-800",
    preparing: "bg-blue-100 text-blue-800",
    ready: "bg-green-100 text-green-800",
    completed: "bg-gray-200 text-gray-700",
    cancelled: "bg-red-100 text-red-800"
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="flex flex-col justify-between h-full">
        {/* Top row: summary */}
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div className="space-y-1 break-words max-w-[70%]">
            <div className="font-semibold text-sunrice-brown dark:text-sunrice-yellow break-all">
              Order #{order._id}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}
            </div>
            <div
              className={`inline-block px-2 py-1 text-xs rounded ${badgeColor[order.status]}`}
            >
              {order.status}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 min-w-[100px]">
            <select
              value={order.status}
              onChange={(e) => onStatusChange(order._id, e.target.value)}
              className="border rounded px-2 py-1 text-sm w-full"
            >
              {["pending", "preparing", "ready", "completed", "cancelled"].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={onToggle}
              className="text-sunrice-brown underline text-sm"
            >
              {expanded ? "Collapse" : "Expand"}
            </button>
          </div>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-4 text-sm space-y-2">
            {order.items.map(i => (
              <div key={i.itemId} className="flex justify-between gap-4">
                <span className="truncate">{i.snapshot.name}</span>
                <span>{i.quantity} × ${i.snapshot.price}</span>
              </div>
            ))}
            <div className="text-right font-bold mt-2">
              Total: ${order.total.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrderList;