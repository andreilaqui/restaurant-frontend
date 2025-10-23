import reservations from "../data/reservations";

export function getReservations() {
  return Promise.resolve(reservations);
}

export function createReservation(newRes) {
  const id = reservations.length + 1;
  const reservation = { id, ...newRes };
  reservations.push(reservation);
  return Promise.resolve(reservation);
}