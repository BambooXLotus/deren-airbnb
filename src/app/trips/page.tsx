import getCurrentUser from "~/actions/getCurrentUser";
import getReservations from "~/actions/getReservations";
import { EmptyState } from "~/components/EmptyState";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="401 Unauthorized" subtitle="Please Login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Book some trips to see your reservations here!"
      />
    );
  }

  return <div>Trips</div>;
}
