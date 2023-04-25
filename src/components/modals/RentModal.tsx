"use client";

import useRentModal from "~/hooks/useRentModal";
import { Modal } from "./Modal";
import { useMemo, useState } from "react";
import { Heading } from "../Heading";
import { categoriesList } from "../navbar/CategoriesList";
import { CategoryInput } from "../inputs/CategoryInput";
import { type FieldValues, useForm } from "react-hook-form";
import { CountrySelect } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";

type RentModalProps = {
  id?: string;
};

type RentFormInput = {
  category: string;
  location: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
};

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

export const RentModal: React.FC<RentModalProps> = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const watchCategory = watch("category", "");
  const watchLocation = watch("location", "");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [watchLocation]
  );

  const setCustomValue = (id: string, value: string) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categoriesList.map((category) => (
          <div key={category.label} className="col-span-1">
            <CategoryInput
              onClick={(clickedCategory) =>
                setCustomValue("category", clickedCategory)
              }
              icon={category.icon}
              selected={watchCategory === category.label}
              label={category.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Where is your place located?"
          subtitle="Help guest find you!"
        />
        <CountrySelect
          value={watchLocation}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={watchLocation?.latlng} />
      </div>
    );
  }

  function onBack() {
    setStep((value) => value - 1);
  }

  function onNext() {
    setStep((value) => value + 1);
  }

  return (
    <Modal
      title="Airbnb your home!"
      body={bodyContent}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onSubmit={onNext}
    />
  );
};
