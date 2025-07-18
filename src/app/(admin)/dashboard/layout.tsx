import AdminLayout from "@/components/dashboard/AdminLayout";
import "./admin.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
}
