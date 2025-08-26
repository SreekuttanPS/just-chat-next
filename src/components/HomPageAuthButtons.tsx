"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import LoaderComponent from "@/components/LoaderComponent";

import { UserResponse } from "@/types/commonTypes";
import { userStore } from "@/zustand/userStore";
import toast from "react-hot-toast";

function HomPageAuthButtons() {
  const router = useRouter();
  const addUser = userStore((state) => state?.addUser);
  const [isLoading, setIsLoading] = useState(false);

  const onButtonClick = async (authType: "login" | "signup") => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/user");

      if (res.ok) {
        const user: UserResponse = await res.json();
        addUser(user);
        setIsLoading(false);
        router.push(`/chat`);
      } else {
        setIsLoading(false);
        router.push(`/auth/${authType}`);
      }
    } catch {
      setIsLoading(false);
      toast.error("Something went wrong, Please login again!");
      router.replace(`/auth/${authType}`);
    }
  };

  return (
    <div className="flex gap-4 mb-8">
      {isLoading ? <LoaderComponent /> : null}
      <button
        onClick={() => onButtonClick("login")}
        className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition"
        type="button"
      >
        Login
      </button>
      <button
        onClick={() => onButtonClick("signup")}
        className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition"
        type="button"
      >
        Signup
      </button>
    </div>
  );
}

export default HomPageAuthButtons;
