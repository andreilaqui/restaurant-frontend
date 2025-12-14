import React, { useState } from "react";
import PageWrapper from "../../components/common/PageWrapper";
import AdminSectionHeader from "../../components/admin/AdminSectionHeader";
import AdminMenuList from "../../components/admin/AdminMenuList";


// Mock data
import menuItems from "../../data/menuItems";
import reservations from "../../data/reservations";
import orders from "../../data/orders";

function AdminDashboard() {
  const [editingItem, setEditingItem] = useState(null);
  const [viewMode, setViewMode] = useState("compact");


  // Helper: badge styles for order status
  const statusClasses = {
    Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <PageWrapper title="Admin Dashboard">
      <div className="space-y-10 dark:text-white/80">

        {/* Menu Management */}
        <section className="bg-white/80 dark:bg-white/10 p-6 rounded-xl shadow-md overflow-x-auto">
          <AdminSectionHeader
            title="Menu Management"
            toggleLabel={viewMode === "compact" ? "View All" : "Compact View"}
            onToggle={() =>
              setViewMode(viewMode === "compact" ? "expanded" : "compact")
            }
          />
          <AdminMenuList
            viewMode={viewMode}
            onEdit={(item) => setEditingItem(item)}
            onDelete={(item) => console.log("Delete", item)}
          />

        </section>


        {/* Reservations Viewer */}
        <section className="bg-white dark:bg-white/10 p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-bold text-sunrice-brown dark:text-sunrice-yellow mb-4">
            Reservations
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-2">Date</th>
                <th className="py-2">Time</th>
                <th className="py-2">Guests</th>
                <th className="py-2">Event</th>
              </tr>
            </thead>
            <tbody>
              {reservations.slice(0, 3).map(r => (
                <tr key={r.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="py-2">{r.date}</td>
                  <td className="py-2">{r.time}</td>
                  <td className="py-2">{r.partySize}</td>
                  <td className="py-2">{r.eventType || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-sm text-sunrice-brown dark:text-sunrice-yellow">
            Showing {Math.min(3, reservations.length)} of {reservations.length} reservations
          </p>
        </section>

        {/* Orders Viewer */}
        <section className="bg-white dark:bg-white/10 p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-bold text-sunrice-brown dark:text-sunrice-yellow mb-4">
            Orders
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-2">Order #</th>
                <th className="py-2">Items</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 3).map(o => (
                <tr key={o.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="py-2">{o.id}</td>
                  <td className="py-2">{o.items.length}</td>
                  <td className="py-2">${o.total}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusClasses[o.status] || ""}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-sm text-sunrice-brown dark:text-sunrice-yellow">
            Showing {Math.min(3, orders.length)} of {orders.length} orders
          </p>
        </section>
      </div>

      {/* Edit Modal (mock) */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Menu Item</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  defaultValue={editingItem.name}
                  className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  defaultValue={editingItem.price}
                  className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  defaultValue={editingItem.description}
                  rows={3}
                  className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
                />
              </div>
              <div>
                <label className="inline-flex items-center mr-2">Available</label>
                <input type="checkbox" checked></input>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-sunrice-brown text-white rounded hover:bg-sunrice-yellow hover:text-sunrice-brown transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

export default AdminDashboard;