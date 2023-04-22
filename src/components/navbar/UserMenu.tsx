"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import { MenuItem } from "./MenuItem";
import useRegisterModal from "~/hooks/useRegisterModal";

type UserMenuProps = {
  id?: string;
};

export const UserMenu: React.FC<UserMenuProps> = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {
            console.log("donkey");
          }}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 py-1 transition hover:shadow-lg md:px-2"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vh] overflow-hidden rounded-xl bg-white text-sm shadow-lg md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            <>
              <MenuItem onClick={() => console.log()} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};
