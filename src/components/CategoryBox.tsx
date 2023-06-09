"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { type IconType } from "react-icons/lib";
import qs from "query-string";

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
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-500" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};
