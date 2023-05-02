import getCurrentUser from "~/actions/getCurrentUser";
import getFavoriteListings from "~/actions/getFavoriteListings";
import { EmptyState } from "~/components/EmptyState";
import { FavoritesClient } from "./FavoritesClient";

export default async function FavoritesPage() {
  const favoriteListings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have not favorited any listings yet!"
      />
    );
  }

  return (
    <FavoritesClient listings={favoriteListings} currentUser={currentUser} />
  );
}
