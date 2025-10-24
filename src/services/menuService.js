
import menuItems from "../data/menuItems";      //my simulated data
import { MENU_CATEGORIES } from "../data/menuCategories";  //list of categories

/*This is a thin API simulation, will be replaced with real API calls */

// Get all categories
export function getCategories() {
  return MENU_CATEGORIES;
}

// Get all menu items
export function getMenuItems() {
  return menuItems;
}

// Get items by category id (e.g. "sweets", "rice")
export function getMenuItemsByCategory(categoryId) {
  return menuItems.filter(item => item.category === categoryId);
}

// Get single item by slug (useful for detail pages later)
export function getMenuItemBySlug(slug) {
  return menuItems.find(item => item.slug === slug);
}

// Get items by tag (e.g. "vegan", "spicy")
export function getMenuItemsByTag(tag) {
  return menuItems.filter(item => item.tags?.includes(tag));
}

// Get items by keyword in name or description
export function searchMenuItems(keyword) {
  const lower = keyword.toLowerCase();
  return menuItems.filter(item =>
    item.name.toLowerCase().includes(lower) ||
    item.description.toLowerCase().includes(lower)
  );
}

