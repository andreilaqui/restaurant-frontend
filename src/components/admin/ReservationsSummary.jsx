import React from "react";

function ReservationsSummary({ totalReservations, avgPartySize, reservations }) {
  return (
    <section className="bg-white dark:bg-white/10 p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Reservations Summary</h2>
      <p>Total Reservations: {totalReservations}</p>
      <p>Average Party Size: {avgPartySize}</p>
      <p>
        Event Types: {reservations.map(r => r.eventType || "None").join(", ")}
      </p>
    </section>
  );
}

export default ReservationsSummary;