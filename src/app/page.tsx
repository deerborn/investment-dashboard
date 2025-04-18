"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

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
          {loading ? <p>Loading...</p> : <p>£{data.bitcoin.toLocaleString()}</p>}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">MSTR Price (USD)</h2>
          {loading ? <p>Loading...</p> : <p>${data.mstr.toLocaleString()}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

