import getCurrentUser from "~/actions/getCurrentUser";
import getListingById from "~/actions/getListingById";
import { EmptyState } from "~/components/EmptyState";
import { ListingClient } from "./ListingClient";

type ListingPageParams = {
  listingId?: string;
};

export default async function ListingPage({
  params,
}: {
  params: ListingPageParams;
}) {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params);

  if (!listing) return <EmptyState />;

  return (
    <div>
      <ListingClient listing={listing} currentUser={currentUser} />
    </div>
  );
}
