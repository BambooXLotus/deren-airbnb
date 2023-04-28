import { type User } from "@prisma/client";
import { type SafeUser } from "~/types";

type ListingInfoProps = {
  user: User | null;
  category: string;
  description: string;
  roomCount: string;
  guestCount: string;
  bathroomCount: string;
  locationValue: string;
};

export const ListingInfo: React.FC<ListingInfoProps> = () => {
  return <div>ListingInfo</div>;
};
