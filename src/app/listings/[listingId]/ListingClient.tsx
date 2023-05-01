"use client";

import { type Reservation, type Listing, type User } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type Range } from "react-date-range";
import { toast } from "react-hot-toast";
import { Container } from "~/components/Container";
import { ListingHead } from "~/components/listings/ListingHead";
import { ListingInfo } from "~/components/listings/ListingInfo";
import { ListingReservation } from "~/components/listings/ListingReservation";
import { categoriesList } from "~/components/navbar/CategoriesList";
import useLoginModal from "~/hooks/useLoginModal";
import { type SafeUser } from "~/types";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type ListingClientProps = {
  listing: Listing & { user: User };
  currentUser: SafeUser | null;
  reservations?: Reservation[];
};

export const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range | undefined>(
    initialDateRange
  );

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    if (!dateRange) return;

    setIsLoading(true);

    await axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success("Airbnb has been reserved!");
        setDateRange(initialDateRange);
        // Redirect to /trips
        router.refresh();
      })
      .catch(() => toast.error("SOMTHING WONG!!!"))
      .finally(() => setIsLoading(false));
  }, [currentUser, dateRange, listing.id, loginModal, totalPrice, router]);

  useEffect(() => {
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
