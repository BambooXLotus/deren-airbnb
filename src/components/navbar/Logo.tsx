"use client";

import Image from "next/image";

type LogoProps = {
  id?: string;
};

export const Logo: React.FC<LogoProps> = () => {
  return (
    <div className="flex flex-row items-center">
      <Image
        alt="Logo"
        className="hidden h-10 w-10 animate-bounce cursor-pointer hover:animate-spin md:block"
        height={100}
        width={100}
        src="/images/logo.png"
      />
      <span className="text-2xl font-extrabold text-rose-500">airbnb</span>
    </div>
  );
};
