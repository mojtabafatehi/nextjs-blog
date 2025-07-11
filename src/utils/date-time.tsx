import moment from "moment-jalaali";
import toPersianDigits from "./number";

// مپ اسم ماه‌ها انگلیسی به فارسی
const persianMonths: Record<string, string> = {
  farvardin: "فروردین",
  ordibehesht: "اردیبهشت",
  khordad: "خرداد",
  tir: "تیر",
  mordad: "مرداد",
  shahrivar: "شهریور",
  mehr: "مهر",
  aban: "آبان",
  azar: "آذر",
  dey: "دی",
  bahman: "بهمن",
  esfand: "اسفند",
};

// تابع برای تبدیل نام ماه انگلیسی به فارسی
function convertMonthToPersian(dateStr: string) {
  for (const [en, fa] of Object.entries(persianMonths)) {
    const regex = new RegExp(en, "i");
    if (regex.test(dateStr)) {
      return dateStr.replace(regex, fa);
    }
  }
  return dateStr;
}

export function getPersianDate() {
  const rawDate = moment().locale("fa").format("jD jMMMM jYYYY"); // مثل "21 tir 1404"
  const dateWithPersianMonth = convertMonthToPersian(rawDate);
  return toPersianDigits(dateWithPersianMonth);
}

export function getPersianTime() {
  const time = moment().format("HH:mm");
  return toPersianDigits(time);
}
