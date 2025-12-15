import menuItems from "../data/menuItems";      // simulated data
import { MENU_CATEGORIES } from "../data/menuCategories";  // list of categories
import api from "../utils/api";


// Get all categories
export async function getCategories() {
  const res = await api.get("/menucategories");
  //return res.data.filter(cat => cat.label !== "All");
  return res.data;
}

// Get all menu items (only available ones by default)
export async function getMenuItems(includeUnavailable = false) {
  const res = await api.get("/menuitems");
  return includeUnavailable ? res.data : res.data.filter(item => item.availability);
}

// Get items by category id (e.g. "sweets", "rice")
export async function getMenuItemsByCategory(categoryId, includeUnavailable = false) {
  const items = await getMenuItems(includeUnavailable);
  return items.filter(item => item.category.code === categoryId);
}

// Get single item by slug (useful for detail pages later)
export async function getMenuItemBySlug(slug, includeUnavailable = false) {
  const items = await getMenuItems(includeUnavailable);
  return items.find(item => item.slug === slug);
}

// Get items by tag (e.g. "vegan", "spicy")
export async function getMenuItemsByTag(tag, includeUnavailable = false) {
  const items = await getMenuItems(includeUnavailable);
  return items.filter(item => item.tags?.includes(tag));
}


// Get items by keyword in name or description
export async function searchMenuItems(keyword, includeUnavailable = false) {
  const items = await getMenuItems(includeUnavailable);
  const lower = keyword.toLowerCase();
  return items.filter(
    item =>
      item.name.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower)
  );
}
