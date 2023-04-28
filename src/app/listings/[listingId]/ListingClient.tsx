"use client";

import { type Reservation, type Listing, type User } from "@prisma/client";
import { useMemo } from "react";
import { Container } from "~/components/Container";
import { ListingHead } from "~/components/listings/ListingHead";
import { ListingInfo } from "~/components/listings/ListingInfo";
import { categoriesList } from "~/components/navbar/CategoriesList";
import { type SafeUser } from "~/types";

type ListingClientProps = {
  listing: Listing & { user: User };
  currentUser: SafeUser | null;
  reservations?: Reservation[];
};

export const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categoriesList.find(
      (category) => category.label === listing.category
    );
  }, [listing.category]);

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
