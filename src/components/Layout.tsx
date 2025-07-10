import React from "react";
//import NavBar from "./NavBar";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div>
      {/** <NavBar /> */}
      {children}
    </div>
  );
}
