"use client";

import { FormProvider, useForm } from "react-hook-form";
import Input from "../UI/Input";
import UploadMedia from "../media/UploadMedia";
import { useState } from "react";
import SuccessModal from "../ui/SuccessModal";
import { createPerson } from "@/app/actions/persons";

type PersonFormValues = {
  fullName: string;
  role: "reciter" | "speaker";
  avatarUrl: string;
};

export default function CreatePersonForm() {
  const methods = useForm<PersonFormValues>({
    defaultValues: {
      fullName: "",
      role: "reciter",
      avatarUrl: "",
    },
  });

  const { handleSubmit, setValue, reset } = methods;

  const [newPersonId, setNewPersonId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: PersonFormValues) => {
    try {
      setIsSubmitting(true);
      const person = await createPerson(data); // سرور اکشن
      setNewPersonId(person.id); // فرض: اکشن id برمی‌گردونه
      reset();
    } catch (err) {
      console.error("❌ خطا در ذخیره فرد:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id="create-person"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <h2 className="text-lg font-bold text-center">اضافه کردن فرد جدید</h2>

        {/* fullName */}
        <Input
          id="fullName"
          label="نام (نمایش در سایت)"
          placeholder="مثال: مجتبی فاتحی"
          rules={{ required: "نام الزامی است" }}
          required
        />

        {/* role */}
        <div className="space-y-2">
          <label
            htmlFor="role"
            className="block text-xs font-medium dark:text-white"
          >
            نقش فرد
          </label>
          <select
            id="role"
            {...methods.register("role")}
            className="w-full rounded-lg border border-gray-400 px-3 py-2 bg-gray-600 text-white"
          >
            <option value="reciter">مداح</option>
            <option value="speaker">سخنران</option>
          </select>
        </div>

        {/* avatar */}
        <UploadMedia
          accept="image/*"
          buttonText="آپلود تصویر پروفایل"
          type="images"
          onUploadComplete={(url) => {
            setValue("avatarUrl", url, { shouldValidate: true });
          }}
        />
        <input type="hidden" {...methods.register("avatarUrl")} />

        {/* submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 py-2 rounded-xl text-white"
        >
          {isSubmitting ? "در حال ذخیره..." : "ذخیره فرد"}
        </button>
      </form>

      {/* success modal */}
      {newPersonId && (
        <span className="p-4 bg-green-500 text-amber-50">
          با موفقیت ذخیره شد
        </span>
      )}
    </FormProvider>
  );
}
