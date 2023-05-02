"use client";

import { PacmanLoader } from "react-spinners";

type LoaderProps = {
  id?: string;
};

export const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <PacmanLoader size={100} color="red" />
    </div>
  );
};
