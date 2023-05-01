"use client";

import { type Range } from "react-date-range";
import { Calendar } from "../inputs/Calendar";
import { Button } from "../Button";

type ListingReservationProps = {
  price: number;
  totalPrice: number;
  dateRange: Range | undefined;
  disabled?: boolean;
  disabledDates: Date[];
  onChangeDate: (value: Range | undefined) => void;
  onSubmit: () => void;
};

export const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">{`$ ${price}`}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
        <div>Total</div>
        <div>{`$ ${totalPrice}`}</div>
      </div>
    </div>
  );
};
