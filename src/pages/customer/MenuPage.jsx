// 🔧 Core React
import React from 'react';

// 🧩 Pages
// import HomePage from './HomePage';
// import AboutPage from './AboutPage';

//Data
//import menuItems from "../../data/menuItems";

// 🧱 Components
import MenuCard from "../../components/customer/MenuCard";
import PageWrapper from '../../components/common/PageWrapper';

// 🛠 Services
import { getMenuItems, getCategories, getMenuItemsByCategory } from '../../services/menuService';

function MenuPage() {
  const [activeCategory, setActiveCategory] = React.useState("all");

  const menuCategories = getCategories();
  const menuItems = activeCategory === "all"
    ? getMenuItems()
    : getMenuItemsByCategory(activeCategory);


  return (
    <PageWrapper title="Menu">
      <div className="bg-sunrice-cream dark:bg-neutral-900 min-h-screen py-10 px-6">
        <h1 className="text-3xl font-bold text-sunrice-brown dark:text-sunrice-cream mb-8 text-center">
          Manila Sunrice Menu
        </h1>

        <div className="flex gap-3 justify-center mb-8 flex-wrap">
          {/* All tab */}
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded border transition
                        ${activeCategory === "all"
                          ? "bg-sunrice-brown text-white border-sunrice-brown"
                          : "bg-sunrice-cream dark:bg-neutral-800 text-sunrice-brown dark:text-sunrice-cream border-sunrice-brown/30"
                        }`}
            aria-pressed={activeCategory === "all"}
          >
            All
          </button>

          {/* Dynamic category tabs */}
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded border transition
                          ${activeCategory === cat.id
                            ? "bg-sunrice-brown text-white border-sunrice-brown"
                            : "bg-sunrice-cream dark:bg-neutral-800 text-sunrice-brown dark:text-sunrice-cream border-sunrice-brown/30"
                          }`}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}

export default MenuPage