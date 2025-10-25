import menuItems from "../data/menuItems";      // simulated data
import { MENU_CATEGORIES } from "../data/menuCategories";  // list of categories

/* This is a thin API simulation, will be replaced with real API calls */

// Get all categories
export function getCategories() {
  return MENU_CATEGORIES;
}

// Get all menu items (only available ones by default)
export function getMenuItems(includeUnavailable = false) {
  return includeUnavailable
    ? menuItems
    : menuItems.filter(item => item.availability);
}

// Get items by category id (e.g. "sweets", "rice")
export function getMenuItemsByCategory(categoryId, includeUnavailable = false) {
  return getMenuItems(includeUnavailable).filter(
    item => item.category === categoryId
  );
}

// Get single item by slug (useful for detail pages later)
export function getMenuItemBySlug(slug, includeUnavailable = false) {
  return getMenuItems(includeUnavailable).find(item => item.slug === slug);
}

// Get items by tag (e.g. "vegan", "spicy")
export function getMenuItemsByTag(tag, includeUnavailable = false) {
  return getMenuItems(includeUnavailable).filter(item =>
    item.tags?.includes(tag)
  );
}

// Get items by keyword in name or description
export function searchMenuItems(keyword, includeUnavailable = false) {
  const lower = keyword.toLowerCase();
  return getMenuItems(includeUnavailable).filter(
    item =>
      item.name.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower)
  );
}