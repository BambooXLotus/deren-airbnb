"use client";

import { BiSearch } from "react-icons/bi";
import useSearchModal from "~/hooks/useSearchModal";

type SearchProps = {
  id?: string;
};

export const Search: React.FC<SearchProps> = () => {
  const searchModal = useSearchModal();

  return (
    <div
      onClick={searchModal.onOpen}
      className="w-full cursor-pointer rounded-full border py-2 shadow-md transition hover:shadow-lg md:w-auto"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="px-6 text-sm font-semibold">Anywhere</div>
        <div className="hidden flex-1 border-x px-6 text-center text-sm font-semibold sm:block">
          Any Week
        </div>
        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">Add Guest</div>
          <div className="rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
