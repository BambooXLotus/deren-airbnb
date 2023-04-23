import { type IconType } from "react-icons/lib";

type CategoryBoxProps = {
  label: string;
  icon: IconType;
  selected?: boolean;
};

export const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  return (
    <div
      className={`
        flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-500" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
    </div>
  );
};
