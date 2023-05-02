import getCurrentUser from "~/actions/getCurrentUser";
import getReservations from "~/actions/getReservations";
import { EmptyState } from "~/components/EmptyState";
import { ReservationsClient } from "./ReservationsClient";

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="401 Unauthorized" subtitle="Please Login" />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like nobody has reserved your properties yet!"
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
}
