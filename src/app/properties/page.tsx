import getCurrentUser from "~/actions/getCurrentUser";
import getListings from "~/actions/getListings";
import { EmptyState } from "~/components/EmptyState";

import { PropertiesClient } from "./PropertiesClient";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="401 Unauthorized" subtitle="Please Login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties for people to book!"
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
}
