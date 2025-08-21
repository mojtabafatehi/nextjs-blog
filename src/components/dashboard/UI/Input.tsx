// 📁 components/ui/Input.tsx
"use client";

import {
  Controller,
  Control,
  FieldValues,
  useFormContext,
} from "react-hook-form";

interface InputProps {
  control?: Control<FieldValues>; //تایپ اشتباه! باید از هوک گرفته شود
  register?: any;
  label: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  rules?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  control,
  label,
  id,
  placeholder,
  required = false,
  rules,
  onChange,
}: InputProps) {
  const styleLabel = "block text-xs font-medium dark:text-white";
  const styleInput =
    "w-full rounded-lg text-sm border-1 border-gray-400 outline-none transition focus:border-red-600 px-5 py-2.5 placeholder:text-gray-400 bg-gray-600 text-white";

  const {register} = useFormContext();
  // اگر control ارائه شده باشد، از Controller استفاده کن
  if (control) {
    return (
      <Controller
        name={id}
        control={control}
        defaultValue=""
        rules={rules || { required }} // استفاده از rules اگر ارائه شده باشد
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <label htmlFor={id} className={styleLabel}>
              {label}
            </label>
            <div className="relative">
              <input
                id={id}
                {...field}
                placeholder={placeholder}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e);
                }}
                className={styleInput}
                readOnly={id === "slug"}
              />
            </div>
            {error && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    );
  }

  // Fallback به register
  return (
    <div>
      <label htmlFor={id} className={styleLabel}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={styleInput}
          {...register(id, rules || { required })}
          placeholder={placeholder}
          onChange={onChange}
          readOnly={id === "slug"}
        />
      </div>
    </div>
  );
}
