import React from "react";
import Navbar from "./Navbar";
import Container from "./Container";
import Image from "next/image";
import DateTimeBox from "./DateTimeBox";

export default function Header() {
  return (
    <header className="h-36 bg-gray-800">
      <Container className="h-full">
        <div className="flex flex-col h-full relative text-white">
          <div className="flex-[3] flex items-center justify-between px-4 text-sm">
            <span>اولین حسینیه مجازی شرق اصفهان</span>
            <div>
              <Image
                src="/header-img.png"
                alt="شعار محرم"
                width={150}
                height={20}
              />
            </div>
            <div>
              <DateTimeBox />
            </div>
          </div>

          <div className="h-px bg-[#e6e6e6] w-[calc(100%-91px)] mx-auto" />

          <div className="flex-[7] flex items-center h-full">
            <Navbar />
          </div>
        </div>
      </Container>
    </header>
  );
}
