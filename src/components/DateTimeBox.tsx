"use client";

import { getPersianDate, getPersianTime } from "@/utils/date-time";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function DateTimeBox() {
  const [date, setDate] = useState(getPersianDate());
  const [time, setTime] = useState(getPersianTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getPersianDate());
      setTime(getPersianTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 text-xs font-light text-white">
      <div className="flex items-center gap-1">
        {date}
        <Calendar size={16} strokeWidth={1} className="-mt-1" />
      </div>

      <span>|</span>

      <div className="flex items-center gap-1">
        {time}
        <Clock size={16} strokeWidth={1} className="-mt-1" />
      </div>
    </div>
  );
}
