"use client";

import { type PropsWithChildren } from "react";

type ContainerProps = {
  id?: string;
} & PropsWithChildren;

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20">
      {children}
    </div>
  );
};
