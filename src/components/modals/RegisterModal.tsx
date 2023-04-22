"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { useCallback, useState } from "react";

import useRegisterModal from "~/hooks/useRegisterModal";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Modal } from "./Modal";

type RegisterModalProps = {
  id?: string;
};

export const RegisterModal: React.FC<RegisterModalProps> = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    name: "",
    email: "",
    password: "",
  });

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    ></Modal>
  );
};
