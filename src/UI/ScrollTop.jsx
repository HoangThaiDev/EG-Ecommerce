// Import Modules
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
  // Create + use Hooks
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes("/setting-account/")) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
