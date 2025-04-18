"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import type { ChartData } from "chart.js"; // ✅ Add this import

const PortfolioGrowthChart = () => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [], // Dates
    datasets: [
      {
        label: "Portfolio Value (£)",
        data: [],
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    // Fake data for now — you can connect this to real portfolio history
    const sampleDates = ["2024-11", "2024-12", "2025-01", "2025-02", "2025-03", "2025-04"];
    const sampleValues = [1000, 1200, 1500, 1700, 1600, 1850];

    setChartData({
      labels: sampleDates,
      datasets: [
        {
          label: "Portfolio Value (£)",
          data: sampleValues,
          fill: false,
          borderColor: "#3b82f6",
          tension: 0.3,
        },
      ],
    });
  }, []);

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Portfolio Growth Over Time</h2>
        <Line data={chartData} />
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const [data, setData] = useState({ bitcoin: null, mstr: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const bitcoinRes = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=gbp"
        );
        const mstrRes = await fetch(
          "https://query1.finance.yahoo.com/v7/finance/quote?symbols=MSTR"
        );

        const bitcoinData = await bitcoinRes.json();
        const mstrData = await mstrRes.json();

        setData({
          bitcoin: bitcoinData.bitcoin.gbp,
          mstr: mstrData.quoteResponse.result[0].regularMarketPrice,
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Bitcoin Price (GBP)</h2>
          {loading ? <p>Loading...</p> : <p>
  £{data?.bitcoin != null ? data.bitcoin.toLocaleString() : "N/A"}</p>}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">MSTR Price (USD)</h2>
          {loading ? <p>Loading...</p> : <p>${data.mstr.toLocaleString()}</p>}
        </CardContent>
      </Card>

      {/* 📈 Portfolio Chart */}
      <PortfolioGrowthChart />
    </div>
  );
};

export default Dashboard;

