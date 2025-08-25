"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { userStore } from "@/zustand/userStore";

import LoaderComponent from "@/components/LoaderComponent";

type UserResponse = {
  username: string;
  name: string;
};

function GetUser() {
  const router = useRouter();
  const addUser = userStore((state) => state.addUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/user");
        console.log("res: ", res);

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
