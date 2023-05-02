import { type PropsWithChildren } from "react";

type GridContainerProps = {
  id?: string;
} & PropsWithChildren;

export const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {children}
    </div>
  );
};
