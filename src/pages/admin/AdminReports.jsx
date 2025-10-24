import React, { useState } from "react";
import PageWrapper from "../../components/common/PageWrapper";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Mock data
const mockOrders = [
  { id: 1, date: "2025-10-20", total: 45, status: "Completed" },
  { id: 2, date: "2025-10-20", total: 30, status: "Completed" },
  { id: 3, date: "2025-10-21", total: 22, status: "Pending" },
  { id: 4, date: "2025-10-21", total: 60, status: "Completed" },
  { id: 5, date: "2025-10-22", total: 18, status: "Cancelled" },
];

const mockReservations = [
  { id: 1, date: "2025-10-25", time: "18:30", partySize: 4, eventType: "Birthday" },
  { id: 2, date: "2025-10-26", time: "12:00", partySize: 2, eventType: null },
  { id: 3, date: "2025-10-26", time: "19:00", partySize: 6, eventType: "Business" },
];

const mockMenuStats = [
  { id: 1, name: "Classic Tapsilog", orders: 25 },
  { id: 6, name: "Ube Fluff Pancakes", orders: 18 },
  { id: 18, name: "Barako Latte", orders: 40 },
  { id: 22, name: "Latik Dirty Matcha", orders: 12 },
];

function AdminReports() {
  const [timeRange, setTimeRange] = useState("thisWeek");

  const ranges = [
    { id: "today", label: "Today" },
    { id: "yesterday", label: "Yesterday" },
    { id: "thisWeek", label: "This Week" },
    { id: "lastWeek", label: "Last Week" },
    { id: "thisMonth", label: "This Month" },
    { id: "lastMonth", label: "Last Month" },
  ];

  // Utility: get start and end dates for each range
  const getDateRange = (rangeId) => {
    const now = new Date("2025-10-22"); // fixed "today" for mock data
    const start = new Date(now);
    const end = new Date(now);

    switch (rangeId) {
      case "today":
        return { start, end };
      case "yesterday":
        start.setDate(now.getDate() - 1);
        end.setDate(now.getDate() - 1);
        return { start, end };
      case "thisWeek": {
        const day = now.getDay(); // 0=Sunday
        start.setDate(now.getDate() - day);
        return { start, end };
      }
      case "lastWeek": {
        const day = now.getDay();
        end.setDate(now.getDate() - day - 1);
        start.setDate(end.getDate() - 6);
        return { start, end };
      }
      case "thisMonth":
        start.setDate(1);
        return { start, end };
      case "lastMonth":
        start.setMonth(now.getMonth() - 1, 1);
        end.setDate(0); // last day of previous month
        return { start, end };
      default:
        return { start, end };
    }
  };

  const { start, end } = getDateRange(timeRange);

  // Filter orders by selected range
  const filteredOrders = mockOrders.filter((o) => {
    const d = new Date(o.date);
    return d >= start && d <= end;
  });

  // Aggregate filtered data
  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.total, 0);
  const completedOrders = filteredOrders.filter(o => o.status === "Completed").length;
  const pendingOrders = filteredOrders.filter(o => o.status === "Pending").length;
  const cancelledOrders = filteredOrders.filter(o => o.status === "Cancelled").length;

  const totalReservations = mockReservations.length;
  const avgPartySize = (
    mockReservations.reduce((sum, r) => sum + r.partySize, 0) / totalReservations
  ).toFixed(1);

  const topMenuItems = [...mockMenuStats].sort((a, b) => b.orders - a.orders).slice(0, 3);

  // Chart Data (based on filtered orders)
  const uniqueDates = [...new Set(filteredOrders.map(o => o.date))];
  const ordersPerDay = {
    labels: uniqueDates,
    datasets: [
      {
        label: "Orders",
        data: uniqueDates.map(
          d => filteredOrders.filter(o => o.date === d).length
        ),
        backgroundColor: "#6F4E37",
      },
    ],
  };

  const orderTrend = {
    labels: uniqueDates,
    datasets: [
      {
        label: "Revenue",
        data: uniqueDates.map(
          d => filteredOrders.filter(o => o.date === d).reduce((sum, o) => sum + o.total, 0)
        ),
        borderColor: "#FFD878",
        backgroundColor: "rgba(255, 216, 120, 0.3)",
        tension: 0.3,
      },
    ],
  };

  const revenueByCategory = {
    labels: ["Rice Dishes", "Sweets", "Drinks"],
    datasets: [
      {
        data: [120, 80, 60], // still mock values
        backgroundColor: ["#FFD878", "#A8D5BA", "#6F4E37"],
      },
    ],
  };

  return (
    <PageWrapper title="Admin Reports">
      <div className="space-y-10">

        {/* Time Range Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ranges.map(r => (
            <button
              key={r.id}
              onClick={() => setTimeRange(r.id)}
              className={`px-3 py-1 rounded border transition ${timeRange === r.id
                  ? "bg-sunrice-brown text-white border-sunrice-brown"
                  : "bg-white dark:bg-white/10 text-sunrice-brown dark:text-sunrice-yellow border-gray-300 dark:border-gray-600 hover:bg-sunrice-yellow hover:text-sunrice-brown"
                }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-4 bg-white dark:bg-white/10 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
          <div className="p-4 bg-white dark:bg-white/10 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold">${totalRevenue}</p>
          </div>
          <div className="p-4 bg-white dark:bg-white/10 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Selected Range</h3>
            <p className="text-lg">{ranges.find(r => r.id === timeRange)?.label}</p>
          </div>
        </div>

        {/* Charts Section */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white dark:bg-white/10 p-4 pb-9 rounded-lg shadow max-h-[300px]">
            <h2 className="text-md font-bold mb-2">Orders Per Day</h2>
            <Bar data={ordersPerDay} options={{ maintainAspectRatio: false }} />
          </div>
          <div className="bg-white dark:bg-white/10 p-4  pb-9 rounded-lg shadow max-h-[300px]">
            <h2 className="text-md font-bold mb-2">Revenue by Category</h2>
            <Pie data={revenueByCategory} options={{ maintainAspectRatio: false }} />
          </div>
          <div className="bg-white dark:bg-white/10 p-4  pb-9 rounded-lg shadow max-h-[300px]">
            <h2 className="text-md font-bold mb-2">Revenue Trend</h2>
            <Line data={orderTrend} options={{ maintainAspectRatio: false }} />
          </div>
        </section>

        {/* Orders Breakdown */}
        <section className="bg-white dark:bg-white/10 p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Orders Breakdown</h2>
          <ul className="space-y-2">
            <li>Completed: {completedOrders}</li>
            <li>Pending: {pendingOrders}</li>
            <li>Cancelled: {cancelledOrders}</li>
          </ul>
        </section>

        {/* Reservations Summary */}
        <section className="bg-white dark:bg-white/10 p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Reservations Summary</h2>
          <p>Total Reservations: {totalReservations}</p>
          <p>Average Party Size: {avgPartySize}</p>
          <p>
            Event Types:{" "}
            {mockReservations.map(r => r.eventType || "None").join(", ")}
          </p>
        </section>

        {/* Top Menu Items */}
        <section className="bg-white dark:bg-white/10 p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Top Menu Items</h2>
          <ul className="divide-y">
            {topMenuItems.map(item => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>{item.name}</span>
                <span>{item.orders} orders</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageWrapper>
  );
}

export default AdminReports;