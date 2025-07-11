import React from "react";

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: IContainerProps) {
  return (
    <div className={`container px-4 mx-auto ${className}`}>{children}</div>
  );
}
