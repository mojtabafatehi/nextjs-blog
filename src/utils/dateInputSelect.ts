// utils/dateInputSelect.ts
import moment from "moment-jalaali";

export const getJalaliYears = (count = 7) => {
  const currentYear = moment().jYear();
  return Array.from({ length: count }, (_, i) => (currentYear + i).toString());
};

export const getJalaliMonths = () => {
  return Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
};

export const getJalaliDays = () => {
  return Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
};

export const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const toGregorian = (year: string, month: string, day: string) => {
  const jalali = `${year}/${month}/${day}`;
  return moment(jalali, "jYYYY/jMM/jDD").locale("en").format("YYYY-MM-DD");
};

export const formatJalaliDisplay = (
  year: string,
  month: string,
  day: string
) => {
  if (!year && !month && !day) return "تاریخی انتخاب نشده";
  if (!year || !month || !day) return "در حال انتخاب…";
  return `${parseInt(day)} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
};
