"use client";

import eventHandler from "@/tracking/eventHandler";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Use a module-level variable so it persists across StrictMode remounts or Suspense unmounts/remounts
let lastTrackedUrl: string | null = null;

const PageTracking = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Only track based on pathname. Ignoring searchParams prevents duplicate page_view
    // events if query parameters are updated dynamically on the client (like selecting a variation).
    if (lastTrackedUrl === pathname) {
      return;
    }

    lastTrackedUrl = pathname;

    const trackPage = async () => {
      // Trigger page_view event
      await eventHandler({
        event_name: "page_view",
      });
    };

    trackPage();
  }, [pathname]); // Removed searchParams to prevent re-tracking on query changes

  return null;
};

export default PageTracking;
