import Header from "./Header";
import Footer from "./Footer";

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
