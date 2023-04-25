import { type IconType } from "react-icons/lib";

type CategoryInputProps = {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
};

export const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex cursor-pointer flex-row items-center gap-3 rounded-xl border-2 p-2 transition hover:border-black
        ${selected ? "border-black" : "border-neutral-200"}
        `}
    >
      <Icon size={18} />
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
};
