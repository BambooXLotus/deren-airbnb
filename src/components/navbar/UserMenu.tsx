"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import useLoginModal from "~/hooks/useLoginModal";
import useRegisterModal from "~/hooks/useRegisterModal";

import { Avatar } from "../Avatar";
import { MenuItem } from "./MenuItem";
import { type User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { type SafeUser } from "~/types";
import useRentModal from "~/hooks/useRentModal";
import { useRouter } from "next/navigation";

type UserMenuProps = {
  currentUser?: SafeUser | null;
};

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
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
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vh] overflow-hidden rounded-xl bg-white text-sm shadow-lg md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem onClick={() => router.push("/trips")} label="Trips" />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="Favorites"
                />
                <MenuItem
                  onClick={() => {
                    () => router.push("/reservations/");
                  }}
                  label="Reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties/")}
                  label="Properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => void signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
