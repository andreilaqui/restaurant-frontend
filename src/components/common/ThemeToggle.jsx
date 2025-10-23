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
      className="h-10 w-10 flex items-center justify-center rounded-full dark:bg-sunrice-yellow bg-moonrice-teal text-sunrice-brown shadow"
    
    >
      {dark ? (
        <img
          src="/icons/sunricelogo.png"
          alt="Light Mode"
          className="h-8 w-8"
        />
      ) : (
        <img
          src="/icons/moonricelogo.png"
          alt="Dark Mode"
          className="h-8 w-8"
        />
      )}

    </button>
  );

}

export default ThemeToggle