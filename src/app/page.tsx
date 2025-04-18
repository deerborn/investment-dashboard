// src/app/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useData } from "@/hooks/useData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Home() {
  const { data, loading } = useData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Investment Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-2">Bitcoin Price (GBP)</h2>
            <p>
              {loading
                ? "Loading..."
                : data?.bitcoin != null
                ? `£${data.bitcoin.toLocaleString()}`
                : "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-2">MSTR Price (GBP)</h2>
            <p>
              {loading
                ? "Loading..."
                : data?.mstr != null
                ? `£${data.mstr.toLocaleString()}`
                : "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

