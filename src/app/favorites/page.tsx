import { EmptyState } from "~/components/EmptyState";

export default async function FavoritesPage() {
  return (
    <EmptyState
      title="No favorites found"
      subtitle="Looks like you have not favorited any listings yet!"
    />
  );
}
