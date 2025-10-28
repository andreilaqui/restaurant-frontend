import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollUp() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // runs every time the route changes

  return null; // don't render anything
}