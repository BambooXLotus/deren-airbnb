"use client";

import Image from "next/image";

type AvatarProps = {
  id?: string;
};

export const Avatar: React.FC<AvatarProps> = () => {
  return (
    <Image
      className="rounded-full"
      width={32}
      height={32}
      alt="Avatar"
      src="/images/avatar.png"
    />
  );
};
