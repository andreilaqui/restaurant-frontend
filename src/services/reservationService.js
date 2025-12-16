// File: src/services/reservationService.js
import api from "../utils/api";

// Create a new reservation (customer)
export async function createReservation(newRes) {
  const res = await api.post("/reservations", newRes, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return res.data;
}

// Get reservations for the logged-in customer
export async function getMyReservations() {
  const res = await api.get("/reservations/my", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return res.data;
}

// Get reservations (admin only, with optional filters)
export async function getReservations(params = {}) {
  const res = await api.get("/reservations", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    params
  });
  return res.data;
}

// Get a specific reservation by ID (admin only)
export async function getReservationById(id) {
  const res = await api.get(`/reservations/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return res.data;
}

// Update reservation (admin only)
export async function updateReservation(id, updates) {
  const res = await api.patch(`/reservations/${id}`, updates, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return res.data;
}

// Delete reservation (admin only)
export async function deleteReservation(id) {
  const res = await api.delete(`/reservations/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return res.data;
}