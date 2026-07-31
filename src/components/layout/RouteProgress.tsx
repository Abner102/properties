"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageLoader from "@/components/ui/PageLoader";

const BOOT_MS = 2400;
const ROUTE_LOADER_MS = 1400;

export default function RouteProgress() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [barVisible, setBarVisible] = useState(false);
  const [boot, setBoot] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const done = window.setTimeout(() => {
      setBoot(false);
      setBooted(true);
    }, BOOT_MS);
    return () => window.clearTimeout(done);
  }, []);

  useEffect(() => {
    if (!booted) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    setRouteLoading(true);
    setBarVisible(true);
    setProgress(12);

    const t1 = window.setTimeout(() => setProgress(40), 280);
    const t2 = window.setTimeout(() => setProgress(70), 650);
    const t3 = window.setTimeout(() => setProgress(100), ROUTE_LOADER_MS);
    const t4 = window.setTimeout(() => {
      setRouteLoading(false);
      setBarVisible(false);
      setProgress(0);
    }, ROUTE_LOADER_MS + 280);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [location.pathname, location.search, booted]);

  return (
    <>
      <AnimatePresence>
        {boot && (
          <motion.div
            key="boot"
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <PageLoader variant="fullscreen" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {routeLoading && (
          <motion.div
            key={`route-${location.pathname}`}
            className="fixed inset-0 z-[90] bg-background/90 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <PageLoader variant="fullscreen" />
          </motion.div>
        )}
      </AnimatePresence>

      {barVisible && (
        <div
          className="fixed top-0 left-0 right-0 z-[95] h-[2px] pointer-events-none overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Page loading"
        >
          <div
            className="h-full gold-gradient shadow-[0_0_12px_rgba(198,167,94,0.55)] transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </>
  );
}
