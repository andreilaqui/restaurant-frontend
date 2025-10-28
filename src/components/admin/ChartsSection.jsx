// src/components/admin/ChartsSection.jsx
import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register all required Chart.js components once
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartsSection({ ordersPerDay, revenueByCategory, orderTrend }) {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      <div className="bg-white dark:bg-white/10 p-4 pb-10 rounded-lg shadow max-h-[300px]">
        <h2 className="text-md font-bold mb-2">Orders Per Day</h2>
        <Bar data={ordersPerDay} options={{ maintainAspectRatio: false }}/>
      </div>
      <div className="bg-white dark:bg-white/10 p-4 pb-10 rounded-lg shadow max-h-[300px]">
        <h2 className="text-md font-bold mb-2">Revenue by Category</h2>
        <Pie data={revenueByCategory} options={{ maintainAspectRatio: false }} />
      </div>
      <div className="bg-white dark:bg-white/10 p-4 pb-10 rounded-lg shadow max-h-[300px]">
        <h2 className="text-md font-bold mb-2">Revenue Trend</h2>
        <Line data={orderTrend} options={{ maintainAspectRatio: false }} />
      </div>
    </section>
  );
}

export default ChartsSection;