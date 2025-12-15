import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/common/PageWrapper";
import AdminSectionHeader from "../../components/admin/AdminSectionHeader";
import AdminMenuList from "../../components/admin/AdminMenuList";
import api from "../../utils/api";
import { slugify } from "../../utils/slugify";


// Mock data
import reservations from "../../data/reservations";
import orders from "../../data/orders";

function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [viewMode, setViewMode] = useState("compact");

  // Fetch menu items once at dashboard level
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

  // Helper: badge styles for order status
  const statusClasses = {
    Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };


  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.get("/menucategories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);


  // Delete menu item
  async function handleDelete(item) {
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

      // setItems((prev) =>
      //   prev.map((i) => (i._id === editingItem._id ? res.data : i))
      // );
      await fetchItems();
      alert("Item updated successfully!");

      setEditingItem(null);
    } catch (err) {
      console.error("Failed to update item:", err);
      alert("Could not save changes. Please try again.");
    }
  }






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
            items={items} // pass items down
            viewMode={viewMode}
            onEdit={(item) => setEditingItem(item)}
            onDelete={handleDelete}
          />
        </section>

        {/* Reservations Viewer */}
        {/* expand later}}

        {/* Orders Viewer */}
        {/* expand later */}

      </div>



      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Menu Item</h3>
            <form className="space-y-4" onSubmit={handleSave}>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingItem.name}
                  className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  min="0"
                  defaultValue={editingItem.price}
                  className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingItem.description}
                  rows={3}
                  className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="category"
                  defaultValue={editingItem.category?._id}
                  className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
                >
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium">Image (optional)</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
                />
              </div>

              {/* Availability */}
              <div>
                <label className="inline-flex items-center mr-2">Available</label>
                <input
                  type="checkbox"
                  name="availability"
                  defaultChecked={editingItem.availability}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium">Tags</label>
                <select
                  name="tags"
                  multiple
                  defaultValue={editingItem.tags}
                  className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="spicy">Spicy</option>
                  <option value="bestseller">Bestseller</option>
                  <option value="new">New</option>
                </select>
                <p className="text-xs text-gray-500">
                  Hold Ctrl (Windows) or Cmd (Mac) to select multiple
                </p>
              </div>

              {/* Buttons */}
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
