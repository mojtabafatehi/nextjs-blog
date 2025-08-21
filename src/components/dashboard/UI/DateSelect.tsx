// components/ui/DateSelect.tsx
type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
};

export default function DateSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: Props) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-1/3 rounded-lg border border-gray-300 px-3 py-2 bg-white text-gray-700 dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
    >
      <option value="">{placeholder}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {label === "month" ? MONTH_NAMES[parseInt(opt) - 1] : opt}
        </option>
      ))}
    </select>
  );
}

const MONTH_NAMES = [
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
