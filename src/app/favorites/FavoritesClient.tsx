"use client";

import { type Listing } from "@prisma/client";
import { Container } from "~/components/Container";
import { GridContainer } from "~/components/GridContainer";
import { Heading } from "~/components/Heading";
import { ListingCard } from "~/components/listings/ListingCard";
import { type SafeUser } from "~/types";

type FavoritesClientProps = {
  listings: Listing[];
  currentUser?: SafeUser | null;
};

export const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <GridContainer>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            currentUser={currentUser}
          />
        ))}
      </GridContainer>
    </Container>
  );
};
