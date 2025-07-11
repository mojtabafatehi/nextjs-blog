"use client";

import { useEffect, useState } from "react";

export default function MapIR({
  lat,
  lng,
  zoom = 15,
  markerText = "موقعیت مکانی",
  className = "",
}) {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    const url = new URL(
      `https://map.ir/lat/${lat}/lng/${lng}/z/${zoom}/p/${markerText}`
    );

    setMapUrl(url.toString());
  }, [lat, lng, zoom, markerText]);

  console.log(mapUrl);

  return (
    <div className={`relative ${className} text-center`}>
      <div className="w-full h-30 md:h-50 rounded-lg overflow-hidden mb-2">
        {mapUrl && (
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            aria-hidden="false"
            tabIndex="0"
            title={`نقشه: ${markerText}`}
          />
        )}
      </div>

      <a
        href={mapUrl}
        target="_blank"
        className="bg-white/20 text-xs px-2 py-1 rounded hover:bg-white transition text-yellow-500"
      >
        باز کردن نقشه در صفحه جدید
      </a>
    </div>
  );
}
