"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchResult {
  type: string;
  id: string;
  title: string;
  subtitle: string;
}

export function GlobalSearch({ onResultClick }: { onResultClick?: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
      setOpen(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative mb-4 max-w-md">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 2 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        placeholder="Global search..."
        className="w-full pl-9 pr-4 py-2 rounded-lg glass text-sm focus:outline-none focus:border-gold/50"
      />
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 glass rounded-xl border border-border shadow-xl z-50 max-h-64 overflow-y-auto">
          {results.map((r) => (
            <button
              key={`${r.type}-${r.id}`}
              onClick={onResultClick}
              className="w-full text-left px-4 py-3 hover:bg-muted/50 border-b border-border/50 last:border-0"
            >
              <p className="text-sm font-medium">{r.title}</p>
              <p className="text-xs text-muted-foreground capitalize">{r.type} · {r.subtitle}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
