"use client";

import { type SafeUser } from "~/types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorite from "~/hooks/useFavorites";

type HeartButtonProps = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={(event) => void toggleFavorite(event)}
      className="relative cursor-pointer transition hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={`${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
};
