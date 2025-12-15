// 🔧 Core React
import React, { useState } from "react";

// 🛠 Services
import { createReservation, getReservations } from "../../services/reservationService";

// 🧱 Components
import PageWrapper from "../../components/common/PageWrapper";

function ReservationPage() {
  const [form, setForm] = useState({
    date: "",
    time: "",
    partySize: 2,
    notes: "",
    eventType: "",
  });

  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Optional: block double-bookings
    const existing = await getReservations();
    const conflict = existing.find(
      (r) => r.date === form.date && r.time === form.time
    );

    if (conflict) {
      setError("Sorry, that time slot is already booked.");
      return;
    }

    const newRes = await createReservation(form);
    setConfirmation(newRes);
  };

  return (
    <PageWrapper title="Make a Reservation">
      {confirmation ? (
        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Reservation Confirmed!</h2>
          <p>Reservation #{confirmation.id} for {confirmation.partySize} guests on {confirmation.date} at {confirmation.time}.</p>
          {confirmation.eventType && <p>Event: {confirmation.eventType}</p>}
        </div>
      ) : (
        <div className="bg-sunrice-yellow/20 dark:bg-white/10 p-4 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto dark:text-sunrice-cream">
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              min="11:00"
              max="21:00"
              className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Party Size</label>
            <input
              type="number"
              name="partySize"
              value={form.partySize}
              onChange={handleChange}
              required
              min={1}
              max={20}
              className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Event Type</label>
            <select
              name="eventType"
              value={form.eventType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
            >
              <option value="">None</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="px-4 py-2 bg-sunrice-brown text-white rounded hover:bg-sunrice-yellow hover:text-sunrice-brown transition"
          >
            Book Reservation
          </button>
        </form>
        </div>
      )}
    </PageWrapper>
  );
}

export default ReservationPage;