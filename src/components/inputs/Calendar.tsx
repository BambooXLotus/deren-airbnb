"use client";

import { DateRange, type Range, type RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type CalendarProps = {
  value: Range | undefined;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
};

export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={value ? [value] : []}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};
