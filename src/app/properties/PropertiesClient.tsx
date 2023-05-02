"use client";

import { type Listing, type Reservation } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { Container } from "~/components/Container";
import { GridContainer } from "~/components/GridContainer";
import { Heading } from "~/components/Heading";
import { ListingCard } from "~/components/listings/ListingCard";
import { type SafeUser } from "~/types";

type PropertiesClientProps = {
  listings: Listing[];
  currentUser?: SafeUser | null;
};

export const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      await axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something Wong!!!");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties!" />
      <GridContainer>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            // reservation={reservation}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </GridContainer>
    </Container>
  );
};
