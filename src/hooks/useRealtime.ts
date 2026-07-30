"use client";

import { useEffect, useCallback } from "react";

export function useRealtime(refetch: () => void, intervalMs = 30000) {
  const stableRefetch = useCallback(refetch, [refetch]);

  useEffect(() => {
    stableRefetch();
    const id = setInterval(stableRefetch, intervalMs);
    return () => clearInterval(id);
  }, [stableRefetch, intervalMs]);
}
