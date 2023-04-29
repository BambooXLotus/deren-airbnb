"use client";

import useCountries from "~/hooks/useCountries";
import { type SafeUser } from "~/types";
import { Heading } from "../Heading";
import Image from "next/image";
import { HeartButton } from "../HeartButton";

type ListingHeadProps = {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
};

export const ListingHead: React.FC<ListingHeadProps> = ({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region || ""}, ${location?.label || ""}`}
      />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
        <Image alt="Image" src={imageSrc} fill className="w-ful object-cover" />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};
