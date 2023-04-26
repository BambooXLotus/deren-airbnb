"use client";

import { type Listing, type Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useCountries from "~/hooks/useCountries";
import { type SafeUser } from "~/types";

import { format } from "date-fns";
import Image from "next/image";
import { HeartButton } from "../HeartButton";
import { Button } from "../Button";

type ListingCardProps = {
  listing: Listing;
  reservation?: Reservation;
  actionId?: string;
  actionLabel?: string;
  onAction?: (id: string) => void;
  disabled?: boolean;
  currentUser?: SafeUser | null;
};

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  reservation,
  actionId,
  actionLabel,
  onAction,
  disabled,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(listing.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled || !actionId) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, actionId, onAction]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return listing.price;
  }, [listing.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="group col-span-1 cursor-pointer"
      onClick={() => router.push(`/listings/${listing.id}`)}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            fill
            alt="listing"
            src={listing.imageSrc}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semi-bold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || listing.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
