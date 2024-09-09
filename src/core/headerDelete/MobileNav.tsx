"use client";
// import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";

import Auth from "./Auth";
import { NavBar } from "./NavBar";

function MobileNav({ lang }: { lang: string }) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => {}} className="">
        <FiAlignJustify className={``} />
      </button>

      <div
        className={""}
        onClick={() => {
          setTimeout(() => {}, 300);
        }}
      >
        <button onClick={() => {}} className="">
          <VscChromeClose className={``} />
        </button>
        <div className="">
          <Auth lang={lang} />
          <NavBar isMobile={true} lang={lang} />
        </div>
      </div>
    </>
  );
}

export default MobileNav;
