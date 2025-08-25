"use client";
import Image from "next/image";
import React from "react";

import closeMenu from "@/assets/close-menu.svg";
import menuNavigation from "@/assets/menu-navigation.svg";
import { navbarStore } from "@/zustand/navbarStore";

function NavbarToggle() {
  const isOpen = navbarStore((state) => state?.isOpen);
  const backgroundClass = isOpen
    ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 dark:text-gray-100"
    : "bg-white dark:bg-black";
  const toggleNavbar = navbarStore((state) => state?.toggleNavbar);

  const onToggle = () => {
    console.log("clicked");
    toggleNavbar();
  };

  return (
    <button
      className={`fixed top-4 right-0 me-3 size-8 rounded-full shadow-lg ${backgroundClass} md:hidden`}
      onClick={onToggle}
    >
      <Image
        src={isOpen ? closeMenu : menuNavigation}
        className="dark:invert"
        alt="Toggle navbar"
      />{" "}
    </button>
  );
}

export default NavbarToggle;
