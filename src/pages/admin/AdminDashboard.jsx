import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/common/PageWrapper";
import AdminSectionHeader from "../../components/admin/AdminSectionHeader";
import AdminMenuList from "../../components/admin/AdminMenuList";
import EditMenuModal from "../../components/admin/EditMenuModal";
import api from "../../utils/api";
import { slugify } from "../../utils/slugify";


// Mock data
import reservations from "../../data/reservations";
import orders from "../../data/orders";

function AdminDashboard() {

  // states
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState("compact");
  const [editingItem, setEditingItem] = useState(null);
  const [addingItem, setAddingItem] = useState(false);


  // fetch menu items once at dashboard level
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

  // badge styles for order status
  const statusClasses = {
    Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };


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
        {/* expand later}}

        {/* Orders Viewer */}
        {/* expand later */}

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
