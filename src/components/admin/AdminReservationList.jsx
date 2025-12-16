import React from "react";

function AdminReservationList({ reservations, viewMode, onStatusChange }) {
  // Compact mode shows only the first 3 reservations
  const visible = viewMode === "compact" ? reservations.slice(0, 3) : reservations;

  return (
    <div>
      {/* Indicator */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {viewMode === "compact"
          ? `Showing ${visible.length} of ${reservations.length} reservations`
          : `Showing all ${reservations.length} reservations`}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map(res => (
          <div
            key={res._id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
          >
            <div className="space-y-1">
              <div className="text-xs text-sunrice-brown dark:text-sunrice-yellow break-all">
                Reservation #{res._id}
              </div>
              <div className="text-lg font-bold text-gray-500 dark:text-gray-400">
                {new Date(res.datetime).toLocaleString()}
              </div>
              <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                Party Size: {res.partySize}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Event: {res.eventType}
              </div>
              {res.notes && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Notes: {res.notes}
                </div>
              )}
              <div className="mt-2">
                <select
                  value={res.status}
                  onChange={(e) => onStatusChange(res._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {["pending", "confirmed", "cancelled", "completed", "no_show"].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReservationList;