import getCurrentUser from "~/actions/getCurrentUser";
import getListings, { type getListingsParams } from "~/actions/getListings";
import { Container } from "~/components/Container";
import { EmptyState } from "~/components/EmptyState";
import { ListingCard } from "~/components/listings/ListingCard";

type HomePageProps = {
  searchParams: getListingsParams;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if (listings?.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings?.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
