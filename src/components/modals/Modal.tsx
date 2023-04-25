"use client";

import { useCallback, useEffect, useState } from "react";

import { IoMdClose } from "react-icons/io";
import { Button } from "../Button";

type ModalProps = {
  isOpen?: boolean;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  onClose,
  onSubmit,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="focus-outline-none fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-hidden bg-neutral-800/70 outline-none">
        <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
          <div
            className={`
            h-full
            transition
            duration-300
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div className="relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-xl outline-none transition focus:outline-none md:h-auto lg:h-auto">
              {/* HEADER */}
              <div className="relative flex items-center justify-center rounded-t border-b-[1px] p-4">
                <button
                  className="absolute left-5 border-0 p-1 transition hover:opacity-70"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-bold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative flex-auto px-6 py-3">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6 pt-3">
                <div className="flex w-full flex-row items-center gap-4">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={secondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
