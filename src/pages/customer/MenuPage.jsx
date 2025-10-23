// 🔧 Core React
import React from 'react';

// 🧩 Pages
// import HomePage from './HomePage';
// import AboutPage from './AboutPage';

//Data
//import menuItems from "../../data/menuItems";

// 🧱 Components
import PageWrapper from '../../components/common/PageWrapper';
import MenuCard from "../../components/customer/MenuCard";
import CategoryCircleIcon from "../../components/customer/CategoryCircleIcon";

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
          {menuCategories.map((cat) => (
            <CategoryCircleIcon
              key={cat.id}
              category={cat}
              isActive={activeCategory === cat.id}
              onClick={setActiveCategory}
              theme="glass"
            />
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