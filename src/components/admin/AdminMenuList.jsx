function AdminMenuList({ items = [], viewMode, onEdit, onDelete }) {
  // Decide how many items to show
  const visibleItems = viewMode === "compact" ? items.slice(0, 5) : items;

  return (
    <div>
      {/* Table layout for desktop */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="w-full text-left border-collapse text-sm sm:text-base">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="py-2 px-1">Name</th>
              <th className="py-2 px-1 hidden sm:table-cell">Category</th>
              <th className="py-2 px-1">Price</th>
              <th className="py-2 px-1 hidden md:table-cell">Description</th>
              <th className="py-2 px-1">Availability</th>
              <th className="py-2 px-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((item) => (
              <tr
                key={item._id || item.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <td className="py-2 px-1">{item.name}</td>
                <td className="py-2 px-1 capitalize hidden sm:table-cell">
                  {item.category?.label || item.category?.code || "—"}
                </td>
                <td className="py-2 px-1">${item.price}</td>
                <td
                  className="py-2 px-1 max-w-xs truncate hidden md:table-cell"
                  title={item.description}
                >
                  {item.description}
                </td>
                <td className="py-2 px-1">
                  {item.availability ? (
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 font-semibold">
                      Unavailable
                    </span>
                  )}
                </td>
                <td className="py-2 px-1 space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="px-2 py-1 text-xs sm:text-sm bg-sunrice-green text-white rounded hover:bg-green-400 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="px-2 py-1 text-xs sm:text-sm bg-red-500/40 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="sm:hidden space-y-4">
        {visibleItems.map((item) => (
          <div
            key={item._id || item.id}
            className="bg-white dark:bg-white/5 rounded-lg shadow p-4"
          >
            <div className="font-semibold text-lg">{item.name}</div>
            <div className="text-sm text-gray-600 dark:text-white/70 mb-1">
              ${item.price} • {item.category?.label || item.category?.code || "—"}
            </div>
            <div className="text-sm mb-2 truncate" title={item.description}>
              {item.description}
            </div>
            <div className="text-sm font-medium">
              {item.availability ? (
                <span className="text-green-600 dark:text-green-400">Available</span>
              ) : (
                <span className="text-red-600 dark:text-red-400">Unavailable</span>
              )}
            </div>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => onEdit(item)}
                className="px-2 py-1 text-sm bg-sunrice-green text-white rounded hover:bg-green-400 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item)}
                className="px-2 py-1 text-sm bg-red-500/40 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 text-sm text-sunrice-brown dark:text-sunrice-yellow">
        Showing {visibleItems.length} of {items.length} items
      </p>
    </div>
  );
}

export default AdminMenuList;