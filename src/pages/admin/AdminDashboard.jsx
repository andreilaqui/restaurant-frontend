import React, { useState, useEffect } from "react";

// 🧱 Components
import PageWrapper from "../../components/common/PageWrapper";
import AdminSectionHeader from "../../components/admin/AdminSectionHeader";
import AdminMenuList from "../../components/admin/AdminMenuList";
import EditMenuModal from "../../components/admin/EditMenuModal";
import AdminOrderList from "../../components/admin/AdminOrderList";
import AdminReservationList from "../../components/admin/AdminReservationList";

// Services
import api from "../../utils/api";
import { slugify } from "../../utils/slugify";

function AdminDashboard() {

  // states

  // menu items
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState("compact");
  const [editingItem, setEditingItem] = useState(null);
  const [addingItem, setAddingItem] = useState(false);

  //orders
  const [orders, setOrders] = useState([]);
  const [ordersViewMode, setOrdersViewMode] = useState("compact");
  const [statusFilter, setStatusFilter] = useState(""); // NEW state for filter

  //resesrvation
  const [reservations, setReservations] = useState([]);
  const [reservationsViewMode, setReservationsViewMode] = useState("compact");



  // fetch menu items
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() { //this guy is outside so we can call it some place else too
    try {
      const res = await api.get("/menuitems");
      const data = Array.isArray(res.data) ? res.data : res.data.items || [];
      setItems(data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
      setItems([]);
    }
  }

  // fetch categories for edit modal
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.get("/menucategories");
        const filtered = res.data.filter(cat => cat.label !== "All");
        setCategories(filtered);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);


  // Delete menu item
  async function handleDelete(item) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );
    if (!confirmed) return;

    try {
      //await api.delete(`/menuitems/${item._id}`);
      await api.delete(`/menuitems/${item._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setItems((prev) => prev.filter((i) => i._id !== item._id));
      alert("Item deleted successfully!");
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Could not delete item. Please try again.");
    }
  }

  // Save edited item
  async function handleSave(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    // --- normalize fields ---
    // auto-generate slug from name
    const name = formData.get("name");
    const slug = slugify(name);
    formData.set("slug", slug);

    // ensure price is a float
    const price = parseFloat(formData.get("price"));
    formData.set("price", price);

    // availability checkbox - boolean
    const availability = formData.get("availability") === "on";
    formData.set("availability", availability);

    // handle multi-select tags
    const tags = formData.getAll("tags");
    formData.delete("tags");
    tags.forEach((t) => formData.append("tags", t));

    try {
      const res = await api.patch(`/menuitems/${editingItem._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchItems();
      alert("Item updated successfully!");

      setEditingItem(null);
    } catch (err) {
      console.error("Failed to update item:", err);
      alert("Could not save changes. Please try again.");
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name")?.trim();
    const price = parseFloat(formData.get("price"));
    const category = formData.get("category");

    if (!name || !category || isNaN(price) || price <= 0) {
      alert("Please fill out Name, Category, and a valid Price.");
      return;
    }

    const imageFile = formData.get("image");
    if (!imageFile || imageFile.size === 0) {
      alert("Please upload an image for the new menu item.");
      return;
    }

    const slug = slugify(name);
    formData.set("slug", slug);
    formData.set("price", price);
    formData.set("availability", formData.get("availability") === "on");

    const tags = formData.getAll("tags");
    formData.delete("tags");
    tags.forEach((t) => formData.append("tags", t));

    try {
      await api.post("/menuitems", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchItems(); // refresh list
      alert("New item added successfully!");
      setAddingItem(false);
    } catch (err) {
      console.error("Failed to add item:", err);
      alert("Could not add item. Please try again.");
    }
  }


  // ORDERS
  // fetch orders once
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await api.get("/orders", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      }
    }
    fetchOrders();
  }, []);

  // handler for status updates
  async function handleOrderStatusChange(orderId, newStatus) {
    try {
      const res = await api.patch(`/orders/${orderId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setOrders(orders.map(o => o._id === orderId ? res.data : o));
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  }

  // filter orders by status
  const filteredOrders = statusFilter
    ? orders.filter(o => o.status === statusFilter)
    : orders;



  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await api.get("/reservations", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        const today = new Date();
        const midnight = new Date(today);
        midnight.setHours(0, 0, 0, 0);
        console.log("Midnight today is:", midnight);

        const filtered = res.data.filter(r => {
          const resDate = new Date(r.datetime);
          const isPast = resDate < midnight; // before today
          const isTerminal = ["cancelled", "completed", "no_show"].includes(r.status);
          return !(isPast || isTerminal);
        });

        setReservations(filtered);
      } catch (err) {
        console.error("Failed to fetch reservations:", err);
        setReservations([]);
      }
    }
    fetchReservations();
  }, []);


  // handler for status updates
  async function handleReservationStatusChange(resId, newStatus) {
    try {
      const res = await api.patch(`/reservations/${resId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setReservations(reservations.map(r => r._id === resId ? res.data : r));
    } catch (err) {
      console.error("Failed to update reservation status:", err);
    }
  }



  return (
    <PageWrapper title="Admin Dashboard">
      <div className="space-y-10 dark:text-white/80">
        {/* Menu Management */}
        <section className="bg-white/80 dark:bg-white/10 p-6 rounded-xl shadow-md overflow-x-auto">

          <AdminSectionHeader title="Menu Management"
            toggleLabel={viewMode === "compact" ? "View All" : "Compact View"}
            onToggle={() =>
              setViewMode(viewMode === "compact" ? "expanded" : "compact")}
          />

          <AdminMenuList
            items={items} // pass items down
            viewMode={viewMode}
            onEdit={(item) => setEditingItem(item)}
            onDelete={handleDelete}
          />

          <div className="flex justify-end items-center mb-6">
            <button onClick={() => setAddingItem(true)}
              className="px-2 py-1 bg-sunrice-brown text-white rounded hover:bg-sunrice-yellow hover:text-sunrice-brown transition"            >
              + Add Item
            </button>
          </div>

        </section>

        {/* Reservations Viewer */}
        <section className="bg-white/80 dark:bg-white/10 p-6 rounded-xl shadow-md overflow-x-auto">
          <AdminSectionHeader
            title="Reservations"
            toggleLabel={reservationsViewMode === "compact" ? "View All" : "Compact View"}
            onToggle={() =>
              setReservationsViewMode(reservationsViewMode === "compact" ? "expanded" : "compact")
            }
          />

          <AdminReservationList
            reservations={reservations}
            viewMode={reservationsViewMode}
            onStatusChange={handleReservationStatusChange}
          />
        </section>


        {/* Orders Viewer */}
        <section className="bg-white/80 dark:bg-white/10 p-6 rounded-xl shadow-md overflow-x-auto">
          <AdminSectionHeader
            title="Orders"
            toggleLabel={ordersViewMode === "compact" ? "View All" : "Compact View"}
            onToggle={() =>
              setOrdersViewMode(ordersViewMode === "compact" ? "expanded" : "compact")
            }
          />

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1 mb-4 dark:text-gray-800 dark:bg-gray-300"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <AdminOrderList
            orders={filteredOrders}
            viewMode={ordersViewMode}
            onStatusChange={handleOrderStatusChange}
          />
        </section>


      </div>

      {/* Edit Modal */}
      {(editingItem || addingItem) && (
        <EditMenuModal
          item={editingItem || {}}   // empty object for Add mode
          categories={categories}
          onClose={() => {
            setAddingItem(false);
            setEditingItem(null);
          }}
          onSave={addingItem ? handleAdd : handleSave}
        />
      )}

    </PageWrapper>
  );
}

export default AdminDashboard;