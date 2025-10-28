import React, { useState } from "react";
import PageWrapper from "../../components/common/PageWrapper";

// Admin components
import TimeRangeSelector from "../../components/admin/TimeRangeSelector";
import KpiCard from "../../components/admin/KpiCard";
import ChartsSection from "../../components/admin/ChartsSection";
import OrdersBreakdown from "../../components/admin/OrdersBreakdown";
import ReservationsSummary from "../../components/admin/ReservationsSummary";
import TopMenuItems from "../../components/admin/TopMenuItems";

// Mock data
import { mockOrders, mockReservations, mockMenuStats } from "../../data/mockReportsData";

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

  // --- Filtering + Aggregation ---
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
      case "thisWeek":
        start.setDate(now.getDate() - now.getDay());
        return { start, end };
      case "lastWeek":
        end.setDate(now.getDate() - now.getDay() - 1);
        start.setDate(end.getDate() - 6);
        return { start, end };
      case "thisMonth":
        start.setDate(1);
        return { start, end };
      case "lastMonth":
        start.setMonth(now.getMonth() - 1, 1);
        end.setDate(0);
        return { start, end };
      default:
        return { start, end };
    }
  };

  const { start, end } = getDateRange(timeRange);

  const filteredOrders = mockOrders.filter((o) => {
    const d = new Date(o.date);
    return d >= start && d <= end;
  });

  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.total, 0);
  const completedOrders = filteredOrders.filter((o) => o.status === "Completed").length;
  const pendingOrders = filteredOrders.filter((o) => o.status === "Pending").length;
  const cancelledOrders = filteredOrders.filter((o) => o.status === "Cancelled").length;

  const totalReservations = mockReservations.length;
  const avgPartySize = (
    mockReservations.reduce((sum, r) => sum + r.partySize, 0) / totalReservations
  ).toFixed(1);

  const topMenuItems = [...mockMenuStats]
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 3);

  const uniqueDates = [...new Set(filteredOrders.map((o) => o.date))];
  const ordersPerDay = {
    labels: uniqueDates,
    datasets: [
      {
        label: "Orders",
        data: uniqueDates.map(
          (d) => filteredOrders.filter((o) => o.date === d).length
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
        data: uniqueDates.map((d) =>
          filteredOrders
            .filter((o) => o.date === d)
            .reduce((sum, o) => sum + o.total, 0)
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
      {/* Add vertical spacing between sections */}
      <div className="space-y-10 dark:text-white/80">
        <TimeRangeSelector
          ranges={ranges}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />

        <KpiCard
          totalOrders={totalOrders}
          totalRevenue={totalRevenue}
          timeRangeLabel={ranges.find((r) => r.id === timeRange)?.label}
        />

        <ChartsSection
          ordersPerDay={ordersPerDay}
          revenueByCategory={revenueByCategory}
          orderTrend={orderTrend}
        />

        <OrdersBreakdown
          completed={completedOrders}
          pending={pendingOrders}
          cancelled={cancelledOrders}
        />

        <ReservationsSummary
          totalReservations={totalReservations}
          avgPartySize={avgPartySize}
          reservations={mockReservations}
        />

        <TopMenuItems items={topMenuItems} />
      </div>
    </PageWrapper>
  );
}

export default AdminReports;