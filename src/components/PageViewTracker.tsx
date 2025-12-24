import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.dataLayer) {
      (window as any).dataLayer = [];
    }
    const payload = {
      event: "page_view",
      page_path: location.pathname + location.search,
      page_title: document.title,
    };
    window.dataLayer.push(payload);
    console.log("[GTM] page_view", payload);
  }, [location.pathname, location.search]);

  return null;
};

export default PageViewTracker;

