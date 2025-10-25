// 🔧 Core React
import React from 'react';

// 🧱 Components
import PageWrapper from '../../components/common/PageWrapper';
import MenuCard from "../../components/customer/MenuCard";
import CategoryCircleIcon from "../../components/customer/CategoryCircleIcon";

// 🛠 Services
import {
  getMenuItems,
  getCategories,
  getMenuItemsByCategory,
  searchMenuItems
} from '../../services/menuService';

function MenuPage() {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [query, setQuery] = React.useState("");

  const menuCategories = getCategories();

  // Base items by category
  let items = activeCategory === "all"
    ? getMenuItems()
    : getMenuItemsByCategory(activeCategory);

  // Apply search filter if query is not empty
  if (query.trim() !== "") {
    items = searchMenuItems(query).filter(item =>
      activeCategory === "all" ? true : item.category === activeCategory
    );
  }

  return (
    <PageWrapper title="Manila Sunrice Menu">

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search menu..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sunrice-brown dark:bg-white/10 dark:text-white"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 justify-center mb-8 flex-wrap">
        {menuCategories.map((cat) => (
          <CategoryCircleIcon
            key={cat.id}
            category={cat}
            isActive={activeCategory === cat.id}
            onClick={setActiveCategory}
          />
        ))}
      </div>

      {/* Hybrid Search Banner */}
      {query.trim() !== "" && activeCategory !== "all" && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg mb-6 text-center text-sm">
          Searching for <span className="font-semibold">"{query}"</span> in{" "}
          <span className="capitalize font-semibold">{activeCategory}</span> —{" "}
          <button
            onClick={() => setActiveCategory("all")}
            className="underline hover:text-sunrice-brown dark:hover:text-sunrice-yellow"
          >
            Clear Filter
          </button>
        </div>
      )}


      {/* Menu Items */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
          No items found.
        </p>
      )}
    </PageWrapper>
  )
}

export default MenuPage;