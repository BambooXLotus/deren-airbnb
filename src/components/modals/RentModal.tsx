"use client";

import useRentModal from "~/hooks/useRentModal";
import { Modal } from "./Modal";
import { useMemo, useState } from "react";
import { Heading } from "../Heading";
import { categoriesList } from "../navbar/CategoriesList";
import { CategoryInput } from "../inputs/CategoryInput";
import { type FieldValues, useForm } from "react-hook-form";
import {
  CountrySelect,
  type CountrySelectValue,
} from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import { Counter } from "../inputs/Counter";
import { ImageUpload } from "../inputs/ImageUpload";
import { Input } from "../inputs/Input";

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
  const [isLoading, setIsLoading] = useState(false);

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
  const watchGuestCount = watch("guestCount", "");
  const watchRoomCount = watch("roomCount", "");
  const watchBathroomCount = watch("bathroomCount", "");
  const watchImageSrc = watch("imageSrc", "");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [watchLocation]
  );

  const setCustomValue = (id: string, value: any) => {
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

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests can stay in your home?"
          value={watchGuestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={watchRoomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many toilets can people use?"
          value={watchBathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={watchImageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="price"
          label="price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
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
