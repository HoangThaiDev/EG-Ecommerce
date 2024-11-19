// Import Modules
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
  // Create + use Hooks
  const location = useLocation();

  // Create + use side Effects
  // --------------- Side Effect: event auto scroll top in browser when change page
  useEffect(() => {
    if (!location.pathname.includes("/setting-account/")) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}
