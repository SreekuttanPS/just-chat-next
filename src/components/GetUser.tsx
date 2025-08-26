"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { userStore } from "@/zustand/userStore";

import LoaderComponent from "@/components/LoaderComponent";

import { UserResponse } from "@/types/commonTypes";

function GetUser() {
  const router = useRouter();
  const addUser = userStore((state) => state.addUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/user");

        if (res.ok) {
          const user: UserResponse = await res.json();
          addUser(user);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          router.replace("/auth/login");
        }
      } catch {
        setIsLoading(false);
        toast.error("Something went wrong, Please login again!");
      }
    }
    fetchUser();
  }, [addUser, router]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return null;
}

export default GetUser;
