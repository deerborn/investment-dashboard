// src/hooks/useData.ts
import { useEffect, useState } from "react";

type PriceData = {
  bitcoin: number | null;
  mstr: number | null;
};

export function useData(): { data: PriceData | null; loading: boolean } {
  const [data, setData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/api/prices");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading };
}

