// 📁 components/archive/archiveForm/FooterSection.tsx
"use client";

import { useFormContext } from "react-hook-form";
import SuccessModal from "../ui/SuccessModal";
import ConfirmPublishModal from "../UI/ConfirmPublishModal";
import Input from "../UI/Input";

export default function FooterSection() {
  const form = useFormContext() as any;

  const {
    control,
    register,
    handleSubmit,
    setValue,
    resetArchive, // این رو اضافه کن (از هوک useArchiveFormData میاد)
    newArchiveId,
    setNewArchiveId,
    onConfirmSubmit,
    onError,
    confirmOpen,
    setConfirmOpen,
    setSubmitType,
  } = form;

  return (
    <>
      {/* فیلد توضیحات */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-xs font-medium dark:text-white"
        >
          توضیحات مراسم
        </label>
        <textarea
          id="description"
          rows={5}
          {...register("description")}
          placeholder="خلاصه ای از مراسم را بنویسید"
          className="w-full rounded-lg text-sm border-gray-400 outline-none px-5 py-2.5 bg-gray-600 text-white"
        />
      </div>

      {/* slug + buttons */}
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-7 space-y-2">
          <Input
            control={control}
            id="slug"
            label="لینک (آدرس) آرشیو"
            placeholder="لطفا تغییری ایجاد نکنید !"
            rules={{}}
          />
        </div>

        <div className="flex col-span-5 mt-6 gap-4">
          <button
            type="button"
            className="col-span-3 w-full bg-green-500 cursor-pointer py-2 px-6 rounded-2xl text-white"
            onClick={handleSubmit(() => {
              setValue("status", "published");
              setSubmitType("published");
              setConfirmOpen(true);
            }, onError)}
          >
            انتشار
          </button>

          <button
            type="button"
            className="col-span-2 w-full bg-blue-500 cursor-pointer py-2 px-6 rounded-2xl text-white"
            onClick={() => {
              setValue("status", "draft");
              setSubmitType("draft");
              handleSubmit(onConfirmSubmit, onError)();
            }}
          >
            ذخیره پیش‌نویس
          </button>
        </div>
      </div>

      {/* hidden status */}
      <input type="hidden" {...register("status")} />

      {/* modal success */}
      {newArchiveId && (
        <SuccessModal
          archiveId={newArchiveId}
          onClose={() => {
            resetArchive();
            setNewArchiveId(null);
            setConfirmOpen(false);
          }}
        />
      )}

      {/* Confirm publish modal */}
      {confirmOpen && (
        <ConfirmPublishModal
          onConfirm={() => {
            handleSubmit(onConfirmSubmit, onError)();
          }}
          onCancel={() => setConfirmOpen(false)}
          onSaveDraft={() => {
            setValue("status", "draft");
            setSubmitType("draft");
            handleSubmit(onConfirmSubmit, onError)();
          }}
        />
      )}
    </>
  );
}
