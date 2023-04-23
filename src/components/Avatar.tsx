"use client";

import Image from "next/image";

type AvatarProps = {
  src: string | null | undefined;
};

export const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      width={32}
      height={32}
      alt="Avatar"
      src={src || "/images/avatar.png"}
    />
  );
};
