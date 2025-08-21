import { Controller, useFormContext } from "react-hook-form";
import DateSelect from "./DateSelect";
import { useEffect, useState } from "react";
import {
  formatJalaliDisplay,
  getJalaliDays,
  getJalaliMonths,
  getJalaliYears,
  toGregorian,
} from "@/utils/dateInputSelect";

type Props = {
  name?: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
};

export default function DatePickerWrapper({
  name = "date",
  label = "تاریخ برگزاری مراسم",
  required = true,
  errorMessage = "تاریخ مراسم لازم است.",
}: Props) {
  const { control, setValue } = useFormContext();

  const years = getJalaliYears();
  const months = getJalaliMonths();
  const days = getJalaliDays();

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    if (year && month && day) {
      const gregorian = toGregorian(year, month, day);
      setValue(name, gregorian);
    } else {
      setValue(name, "");
    }
  }, [year, month, day, setValue, name]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{ required: required ? errorMessage : false }}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="space-y-2">
            <div className="flex justify-between gap-2">
              <label className="block text-xs font-medium text-gray-700 dark:text-white">
                {label}
              </label>
              <span className="text-xs text-gray-500 dark:text-amber-300">
                {formatJalaliDisplay(year, month, day)}
              </span>
            </div>

            <div className="flex gap-2">
              <DateSelect
                label="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                options={days}
                placeholder="روز"
              />
              <DateSelect
                label="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                options={months}
                placeholder="ماه"
              />
              <DateSelect
                label="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                options={years}
                placeholder="سال"
              />
            </div>
            {error && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
