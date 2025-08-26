"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import chatImage from "@/assets/chat.svg";
import { navbarStore } from "@/zustand/navbarStore";

type Props = {
  title: string;
  chatName: string;
  isOnline: boolean;
  imageClass?: string;
  isCommonItem?: boolean;
};

const LeftPanelItem = (props: Props) => {
  const pathname = usePathname();
  const currentPathName = pathname.split("/");
  const currentSegment = currentPathName[currentPathName?.length - 1];
  const toggleNavbar = navbarStore((state) => state?.toggleNavbar);

  return (
    <Link
      className={`flex items-center gap-3 p-3 ${
        currentSegment === props?.chatName
          ? "bg-white/20 dark:bg-gray-800/40"
          : "hover:bg-white/10 dark:hover:bg-gray-800/20"
      } cursor-pointer`}
      href={
        props?.chatName === "chat"
          ? "/chat"
          : `/chat${props?.isCommonItem ? "" : "/dm"}/${props?.chatName}`
      }
      onClick={toggleNavbar}
    >
      <div className="relative">
        <Image
          src={chatImage}
          className={`w-10 h-10 rounded-full ${props?.imageClass || ""}`}
          alt={`Alt ${props?.title} image`}
        />
        {props?.isOnline ? (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        ) : null}
      </div>
      <div>
        <p className="font-medium">{props?.title}</p>
        {props?.isOnline ? (
          <p className="text-xs text-white/70 dark:text-gray-300">Online</p>
        ) : null}
      </div>
    </Link>
  );
};

export default LeftPanelItem;
