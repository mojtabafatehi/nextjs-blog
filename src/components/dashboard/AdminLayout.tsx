import { ILayoutProps } from "../Layout";

export default function AdminLayout({ children }: ILayoutProps) {
  return (
    <div>
      {/* <SidebarAdmin /> */}
      {children}
    </div>
  );
}
