"use client";

import { Preloader } from "@/components/preloader/Preloader";

/**
 * Mounts the cinematic brand preloader once per browser session, ahead of the
 * rest of the site. All sequencing/animation logic lives in components/preloader.
 */
export function WebsiteIntro() {
  return <Preloader />;
}
