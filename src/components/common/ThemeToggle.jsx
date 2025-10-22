// 🔧 Core React
import React from 'react';
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 rounded bg-sunrice-yellow text-sunrice-brown font-semibold shadow"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );

}

export default ThemeToggle