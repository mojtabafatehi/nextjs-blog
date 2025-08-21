import { ILayoutProps } from "../Layout";
import SidebarAdmin from "./SidebarAdmin";

export default function AdminLayout({ children }: ILayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-950">
      <SidebarAdmin />
      <main className="flex-1 bg-gray-900 rounded-lg m-4 shadow p-6">
        {children}
      </main>
    </div>
  );
}
