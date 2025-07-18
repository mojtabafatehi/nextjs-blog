import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "وبلاگ",
  description: "یک وبلاگ مذهبی",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
