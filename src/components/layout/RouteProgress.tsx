"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageLoader from "@/components/ui/PageLoader";

const MIN_VISIBLE_MS = 420;

export default function RouteProgress() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [barVisible, setBarVisible] = useState(false);
  const [boot, setBoot] = useState(true);

  useEffect(() => {
    const done = window.setTimeout(() => setBoot(false), 950);
    return () => window.clearTimeout(done);
  }, []);

  useEffect(() => {
    if (boot) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    setBarVisible(true);
    setProgress(18);

    const t1 = window.setTimeout(() => setProgress(62), 90);
    const t2 = window.setTimeout(() => setProgress(88), 220);
    const t3 = window.setTimeout(() => setProgress(100), MIN_VISIBLE_MS);
    const t4 = window.setTimeout(() => {
      setBarVisible(false);
      setProgress(0);
    }, MIN_VISIBLE_MS + 240);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [location.pathname, location.search, boot]);

  return (
    <>
      <AnimatePresence>
        {boot && (
          <motion.div
            key="boot"
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <PageLoader variant="fullscreen" label="Welcome" />
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
            className="h-full gold-gradient shadow-[0_0_12px_rgba(198,167,94,0.55)] transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </>
  );
}
