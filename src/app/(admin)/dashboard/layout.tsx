import AdminLayout from "@/components/dashboard/AdminLayout";
import "./admin.css";
import { ToastProvider } from "@/hooks/useToast";
import ToastContainer from "@/components/dashboard/UI/ToastContainer";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ToastProvider>
        <AdminLayout>
          {children}

          <ToastContainer />
        </AdminLayout>
      </ToastProvider>
    </>
  );
}
