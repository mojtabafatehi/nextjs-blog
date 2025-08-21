// 📁 components/archive/archiveForm/BasicInfoSection.tsx
"use client";

import { useFormContext } from "react-hook-form";
import Input from "../UI/Input";
import DatePickerWrapper from "../UI/DatePickerWrapper";

export default function BasicInfoSection() {
  const { control } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
      {/* عنوان مراسم */}
      <div className="space-y-2 md:col-span-4">
        <Input
          control={control}
          id="title"
          label="عنوان مراسم"
          placeholder="مثال: شب هشتم محرم 1405"
          rules={{ required: "عنوان مراسم نمی‌تواند خالی باشد." }}
        />
      </div>

      {/* مکان مراسم */}
      <div className="space-y-2 col-span-3">
        <label
          htmlFor="location"
          className="block text-xs font-medium dark:text-white"
        >
          مکان مراسم
        </label>
        <select
          id="location"
          {...useFormContext().register("location")}
          className="w-full rounded-lg border border-gray-400 px-3 py-2 bg-gray-600 text-white"
        >
          <option value="حسینیه بیت المسلم">حسینیه بیت المسلم</option>
          <option value="حسینیه بیت الحسین (وسط)">
            حسینیه بیت الحسین (وسط)
          </option>
        </select>
      </div>

      {/* تاریخ مراسم */}
      <div className="md:col-span-3 space-y-2">
        {/*<DatePicker name="date" />*/}
        <DatePickerWrapper name="date" label="تاریخ برگزاری مراسم" />
      </div>
    </div>
  );
}
