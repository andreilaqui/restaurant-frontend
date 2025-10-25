import React from "react";

function SearchBar({ value, onChange, placeholder = "Search menu..." }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sunrice-brown dark:bg-white/10 dark:text-white"
      />
    </div>
  );
}

export default SearchBar;