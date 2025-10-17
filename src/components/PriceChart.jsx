// src/components/PriceChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PriceChart = ({ data, color = "#FFD700" }) => (
  <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
    <h3 className="text-sm font-semibold text-gray-300 mb-2">
      Historia de Precios (30 días)
    </h3>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="day" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" domain={["auto", "auto"]} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
        />
        <Line type="monotone" dataKey="price" stroke={color} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default PriceChart;
