import React from "react";

function TimeRangeSelector({ ranges, timeRange, setTimeRange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {ranges.map(r => (
        <button
          key={r.id}
          onClick={() => setTimeRange(r.id)}
          className={`px-3 py-1 rounded border transition ${
            timeRange === r.id
              ? "bg-sunrice-brown text-white border-sunrice-brown"
              : "bg-white dark:bg-white/10 text-sunrice-brown dark:text-sunrice-yellow border-gray-300 dark:border-gray-600 hover:bg-sunrice-yellow hover:text-sunrice-brown"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

export default TimeRangeSelector;